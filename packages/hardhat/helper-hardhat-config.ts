import { BigNumber, ethers } from "ethers";

type NetworkConfig = {
	[networkId: number]: {
		name: string;
		minBetValue: BigNumber;
		maxPlayers: string;
		blockConfirmations?: number;
		vrfCoordinatorV2?: string;
		gasLane?: string;
		subscriptionId?: string;
		callbackGasLimit?: string;
		interval: string;
	};
};

const networkConfig: NetworkConfig = {
	11155111: {
		name: "sepolia",
		minBetValue: ethers.utils.parseEther("0.1"), // 0.1 ETH,
		maxPlayers: "10",
		blockConfirmations: 6,
		vrfCoordinatorV2: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
		gasLane:
			"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
		subscriptionId: "1391",
		callbackGasLimit: "2500000", // 2,500,000 gas
		interval: "120", // update interval
	},
	31337: {
		name: "localhost",
		minBetValue: ethers.utils.parseEther("0.1"), // 0.1 ETH,
		maxPlayers: "10",
		gasLane:
			"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // 30 gwei
		callbackGasLimit: "2500000", // 2,500,000 gas // the fulfillRandomWords uses for 10 players almost all gas (2,035,249)
		interval: "120", // update interval
	},
};

const developmentChains = ["hardhat", "localhost"];

export { networkConfig, developmentChains };
