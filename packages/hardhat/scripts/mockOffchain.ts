import { ethers, network } from "hardhat";

async function mockKeepers() {
	const roulette = await ethers.getContract("Roulette");
	const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""));
	const { upkeepNeeded } = await roulette.callStatic.checkUpkeep(checkData);
	if (upkeepNeeded) {
		const tx = await roulette.performUpkeep(checkData);
		const txReceipt = await tx.wait(1);
		const requestId = txReceipt.events[1].args.requestId;
		console.log(`Performed upkeep with RequestId: ${requestId}`);
		if (network.config.chainId == 31337) {
			await mockVrf(requestId, roulette);
		}
	} else {
		console.log("No upkeep needed!");
	}
}

async function mockVrf(requestId: any, roulette: any) {
	console.log("We on a local network? Ok let's pretend...");
	const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
	await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, roulette.address);
	console.log("Responded!");
	const lastWinningNumber = await roulette.getLastWinningNumber();
	console.log(`The last winning number is: ${lastWinningNumber}`);
}

mockKeepers()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
