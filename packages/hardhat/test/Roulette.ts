import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Roulette, VRFCoordinatorV2Mock } from "../typechain-types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";

!developmentChains.includes(network.name)
	? describe.skip
	: describe("Roulette Unit Tests", function () {
			// We define a fixture to reuse the same setup in every test.

			let roulette: Roulette,
				rouletteContract: Roulette,
				vrfCoordinatorV2Mock: VRFCoordinatorV2Mock,
				deployer: SignerWithAddress,
				accounts: SignerWithAddress[],
				interval: BigNumber,
				chainId: number;

			beforeEach(async () => {
				accounts = await ethers.getSigners();
				deployer = accounts[0];
				await deployments.fixture(["all"]);
				rouletteContract = await ethers.getContract("Roulette");
				roulette = rouletteContract.connect(deployer);
				//send 10 ETH from deployer to roulette contract
				await deployer.sendTransaction({
					to: roulette.address,
					value: ethers.utils.parseEther("10.0"),
				});
				vrfCoordinatorV2Mock = await ethers.getContract(
					"VRFCoordinatorV2Mock",
					deployer.address
				);
				interval = await roulette.getInterval();
				chainId = network.config.chainId!;
			});

			describe("constructor", function () {
				it("initializes the roulette correctly", async function () {
					// Ideally just 1 assert per "it"
					const rouletteState = await roulette.getGameState();
					assert.equal(rouletteState.toString(), "0");
					assert.equal(interval.toString(), networkConfig[chainId]["interval"]);
				});
			});

			describe("enterRoulette", function () {
				it("reverts if not enough ETH entered", async function () {
					await expect(roulette.enterRoulette([])).to.be.reverted;
					await expect(
						roulette.enterRoulette([{ number: 1, value: 1 }], {
							value: "0",
						})
					).to.be.reverted;
					await expect(
						roulette.enterRoulette([], {
							value: "0",
						})
					).to.be.reverted;
					await expect(
						roulette.enterRoulette(
							[
								{ number: 1, value: 1 },
								{ number: 2, value: 2 },
							],
							{
								value: "2",
							}
						)
					).to.be.reverted;
				});
				it("reverts if to much ETH entered", async function () {
					const bet = ethers.utils.parseEther((10 / 36 + 1).toString());
					await expect(
						roulette.enterRoulette([{ number: 1, value: bet }], {
							value: bet,
						})
					).to.be.reverted;
				});
				it("reverts if game not open", async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.send("evm_mine", []);
					// We pretend to be a Chainlink Keeper
					await roulette.performUpkeep([]);
					await expect(
						roulette.enterRoulette([{ number: 1, value: 1 }], {
							value: "1",
						})
					).to.be.reverted;
				});
				it("reverts if invalid bet numbers", async function () {
					await expect(
						roulette.enterRoulette([{ number: 37, value: 1 }], {
							value: "1",
						})
					).to.be.reverted;
				});
				it("reverts if invalid bet values", async function () {
					await expect(
						roulette.enterRoulette([{ number: 1, value: 1 }], {
							value: "2",
						})
					).to.be.reverted;
				});
				it("pushes unique player a single time", async function () {
					// enter deployer
					let totalPlayers = await roulette.getTotalPlayers();
					expect(totalPlayers).to.equal(BigNumber.from(0));
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					totalPlayers = await roulette.getTotalPlayers();
					expect(totalPlayers).to.equal(BigNumber.from(1));
					assert.equal(
						await roulette.getPlayer(totalPlayers.sub(1)),
						deployer.address
					);

					// enter account1
					roulette = rouletteContract.connect(accounts[1]);
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					totalPlayers = await roulette.getTotalPlayers();
					expect(totalPlayers).to.equal(BigNumber.from(2));
					assert.equal(
						await roulette.getPlayer(totalPlayers.sub(1)),
						accounts[1].address
					);

					// enter deployer again
					roulette = rouletteContract.connect(deployer);
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					totalPlayers = await roulette.getTotalPlayers();
					expect(totalPlayers).to.equal(BigNumber.from(2));
					assert.equal(await roulette.getPlayer(0), deployer.address);
					assert.equal(await roulette.getPlayer(1), accounts[1].address);
				});
			});

			describe("checkUpkeep", function () {
				it("returns false if roulette doesn't have bets", async function () {
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.send("evm_mine", []);
					const { upkeepNeeded } = await roulette.callStatic.checkUpkeep([]);
					assert(!upkeepNeeded);
				});
				it("returns false if roulette isn't open", async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.send("evm_mine", []);
					await roulette.performUpkeep([]);
					const rouletteState = await roulette.getGameState();
					const { upkeepNeeded } = await roulette.callStatic.checkUpkeep([]);
					assert.equal(rouletteState.toString(), "1");
					assert(!upkeepNeeded);
				});
				it("returns false if enough time hasn't passed", async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() - 5,
					]); // use a higher number here if this test fails
					await network.provider.request({ method: "evm_mine", params: [] });
					const { upkeepNeeded } = await roulette.callStatic.checkUpkeep([]); // upkeepNeeded = (isOpen && timePassed && hasBets)
					assert(!upkeepNeeded);
				});
				it("returns true if enough time has passed, has bets, and is open", async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.request({ method: "evm_mine", params: [] });
					const { upkeepNeeded } = await roulette.callStatic.checkUpkeep([]); // upkeepNeeded = (isOpen && timePassed && hasBets)
					assert(upkeepNeeded);
				});
			});

			describe("performUpkeep", function () {
				it("can only run if checkupkeep is true", async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.send("evm_mine", []);
					const tx = await roulette.performUpkeep([]);
					assert(tx);
				});
				it("reverts if checkUpkeep is false", async function () {
					await expect(roulette.performUpkeep([])).to.be.reverted;
				});
				it("updates the game state, emits an event, and calls the vrf coodrinator", async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.send("evm_mine", []);
					const txResponse = await roulette.performUpkeep([]);
					const txReceipt = await txResponse.wait(1);
					const requestId =
						txReceipt.events && txReceipt.events.length > 0
							? txReceipt.events[1].args?.requestId
							: 0;
					const rouletteState = await roulette.getGameState();
					assert(requestId.toNumber() > 0);
					assert(rouletteState.toString() == "1");
				});
			});

			describe("fulfillRandomWords", function () {
				beforeEach(async function () {
					await roulette.enterRoulette([{ number: 1, value: 1 }], {
						value: "1",
					});
					await network.provider.send("evm_increaseTime", [
						interval.toNumber() + 1,
					]);
					await network.provider.send("evm_mine", []);
				});
				it("can only be called after performUpkeep", async function () {
					await expect(
						vrfCoordinatorV2Mock.fulfillRandomWords(0, roulette.address)
					).to.be.revertedWith("nonexistent request");
					await expect(
						vrfCoordinatorV2Mock.fulfillRandomWords(1, roulette.address)
					).to.be.revertedWith("nonexistent request");
				});
				it("picks a winning number, sends the money, and resets the roulette", async function () {
					// player 4 bet on number 4, player 5 bet on number 5
					for (let i = 4; i <= 5; i++) {
						roulette = rouletteContract.connect(accounts[i]);
						await roulette.enterRoulette([{ number: i, value: i + 1 }], {
							value: i + 1,
						});
					}

					const startingTimeStamp = await roulette.getLatestTimeStamp();

					// performUpkeep (mock being Chainlink Keepers)
					// fulfillRandomWords (mock being the Chainlink VRF)
					// We will have to wait for the fulfillRandomWords to be called
					// todo: check resetEntries()
					await new Promise<void>(async (resolve, reject) => {
						roulette.once("WinningNumberPicked", async () => {
							console.log("Found the event!");
							try {
								const rouletteState = await roulette.getGameState();
								const totalPlayers = await roulette.getTotalPlayers();
								const lastWinningNumber = await roulette.getLastWinningNumber();
								const endingTimeStamp = await roulette.getLatestTimeStamp();
								const accountsEndingBalance = await Promise.all(
									accounts.map(async (account) => {
										return await account.getBalance();
									})
								);
								assert.equal(rouletteState.toString(), "0");
								assert.equal(totalPlayers.toString(), "0");
								assert(endingTimeStamp > startingTimeStamp);

								for (let i = 4; i <= 5; i++) {
									if (i === lastWinningNumber) {
										assert.equal(
											accountsEndingBalance[i].toString(),
											accountsStartingBalance[i].add((i + 1) * 36).toString()
										);
									} else {
										assert.equal(
											accountsEndingBalance[i].toString(),
											accountsStartingBalance[i].toString()
										);
									}
								}
							} catch (e) {
								reject(e);
							}
							resolve(); // todo: check this line
						});
						// Setting up the listener
						// below, we will fire the event, and the listener will pick it up,and resolve
						const tx = await roulette.performUpkeep([]);
						const txReceipt = await tx.wait(1);
						const accountsStartingBalance = await Promise.all(
							accounts.map(async (account) => {
								return await account.getBalance();
							})
						);
						const requestId =
							txReceipt.events && txReceipt.events.length > 0
								? txReceipt.events[1].args?.requestId
								: 0;
						await vrfCoordinatorV2Mock.fulfillRandomWords(
							requestId,
							roulette.address
						);
					});
				});
			});
	  });
