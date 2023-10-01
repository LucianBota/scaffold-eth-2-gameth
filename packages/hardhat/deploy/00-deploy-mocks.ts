import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains } from "../helper-hardhat-config";

const deployRoulette: DeployFunction = async function (
	hre: HardhatRuntimeEnvironment
) {
	const BASE_FEE = hre.ethers.utils.parseEther("0.25"); // 0.25 is the premium. It costs 0.25 LINK per request.
	const GAS_PRICE_LINK = 1e9; // link per gas. calculated value based on the gas price of the chain.

	const { deployer } = await hre.getNamedAccounts();
	const { deploy, log } = hre.deployments;
	const args: any[] = [BASE_FEE, GAS_PRICE_LINK];

	if (developmentChains.includes(hre.network.name)) {
		log("Local network detected! Deploying mocks...");
		// deploy a mock vrfcoordinator...
		await deploy("VRFCoordinatorV2Mock", {
			from: deployer,
			log: true,
			args: args,
		});
		log("Mocks deployed!");
		log("------------------------------------------");
	}
};

export default deployRoulette;

deployRoulette.tags = ["all", "mocks"];
