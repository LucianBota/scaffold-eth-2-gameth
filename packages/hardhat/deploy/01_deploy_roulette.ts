import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

/**
 * Deploys a contract named "Roulette" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployRoulette: DeployFunction = async function (
	hre: HardhatRuntimeEnvironment
) {
	const VRF_SUB_FUND_AMOUNT = hre.ethers.utils.parseEther("2");
	/*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
	const { deployer } = await hre.getNamedAccounts();
	const { deploy, log } = hre.deployments;
	const chainId = hre.network.config.chainId!;
	let vrfCoordinatorV2Address, subscriptionId;

	if (developmentChains.includes(hre.network.name)) {
		const vrfCoordinatorV2Mock = await hre.ethers.getContract(
			"VRFCoordinatorV2Mock"
		);
		vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
		const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
		const transactionReceipt = await transactionResponse.wait(1);
		subscriptionId = transactionReceipt.events[0].args.subId;
		// Fund the subscription
		// Usually, you'd need the link token on a real network
		await vrfCoordinatorV2Mock.fundSubscription(
			subscriptionId,
			VRF_SUB_FUND_AMOUNT
		);
	} else {
		vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
		subscriptionId = networkConfig[chainId].subscriptionId;
	}

	const minBetValue = networkConfig[chainId].minBetValue;
	const maxPlayers = networkConfig[chainId].maxPlayers;
	const gasLane = networkConfig[chainId].gasLane;
	const callbackGasLimit = networkConfig[chainId].callbackGasLimit;
	const interval = networkConfig[chainId].interval;

	const args = [
		vrfCoordinatorV2Address,
		minBetValue,
		maxPlayers,
		gasLane,
		subscriptionId,
		callbackGasLimit,
		interval,
	];
	log(args);
	await deploy("Roulette", {
		from: deployer,
		// Contract constructor arguments
		args: args,
		log: true,
		waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
		// autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
		// automatically mining the contract deployment transaction. There is no effect on live networks.
		autoMine: true,
	});

	// Get the deployed contract
	const roulette = await hre.ethers.getContract("Roulette", deployer);

	// Ensure the Roulette contract is a valid consumer of the VRFCoordinatorV2Mock contract.
	if (developmentChains.includes(hre.network.name)) {
		log(
			"Adding Roulette contract to the VRFCoordinatorV2Mock contract consumers..."
		);
		const vrfCoordinatorV2Mock = await hre.ethers.getContract(
			"VRFCoordinatorV2Mock"
		);
		await vrfCoordinatorV2Mock.addConsumer(subscriptionId, roulette.address);
	}

	// Verify the deployment
	if (
		!developmentChains.includes(hre.network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		log("Verifying...");
		await verify(roulette.address, args);
	}
	log("------------------------------------------");
};

export default deployRoulette;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Roulette
deployRoulette.tags = ["all", "Roulette"];
