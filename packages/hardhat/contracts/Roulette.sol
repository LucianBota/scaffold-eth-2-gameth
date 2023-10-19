//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error Roulette__NotEnoughETHEntered();
error Roulette__ToMuchETHEntered();
error Roulette__NotOpen();
error Roulette__ToManyPlayers();
error Roulette__InvalidBetNumbers();
error Roulette__InvalidBetValues();
error Roulette__TransferFailed(address receiver);
error Roulette__UpkeepNotNeeded(uint256 totalBets, uint256 rouletteState);
error Roulette__InvalidWithdrawAmount();

/**
 * @title Roulette Contract
 * @author Lucian Bota
 * @notice This contract is for creating an untemperable decentralized roulette contract
 * @dev This implements the Chainlink VRF Version 2 and Chainlink Keepers
 */

contract Roulette is Ownable, VRFConsumerBaseV2, KeeperCompatibleInterface {
	/* Type declarations */
	enum GameState {
		OPEN,
		CALCULATING
	} // uint256 0 = OPEN, 1 = CALCULATING

	struct PlayerEntry {
		uint8 number;
		uint256 value;
	}

	/* Chainlink Variables */
	VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
	bytes32 private immutable i_gasLane;
	uint64 private immutable i_subscriptionId;
	uint32 private immutable i_callbackGasLimit;
	uint16 private constant REQUEST_CONFIRMATIONS = 3;
	uint32 private constant NUM_WORDS = 1;

	/* Roulette Valiables */
	mapping(uint8 => mapping(address => uint256)) private s_entries;
	address[] private s_players;
	uint256 private s_totalBets;
	uint8 private s_lastWinningNumber;
	GameState private s_gameState;
	uint256 private s_lastTimeStamp;
	uint256 private immutable i_minBetValue;
	uint256 private immutable i_maxPlayers;
	uint256 private immutable i_interval;
	uint8 private constant START_NUMBERS_INTERVAL = 0;
	uint8 private constant END_NUMBERS_INTERVAL = 36;

	/* Events */
	event RouletteEnter(address indexed player);
	event RequestedRouletteWinner(uint256 indexed requestId);
	event WinningNumberPicked(uint8 indexed winningNumber);

	constructor(
		address vrfCoordinatorV2,
		uint256 minBetValue,
		uint256 maxPlayers,
		bytes32 gasLane,
		uint64 subscriptionId,
		uint32 callbackGasLimit,
		uint256 interval
	) VRFConsumerBaseV2(vrfCoordinatorV2) {
		i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
		i_minBetValue = minBetValue;
		i_maxPlayers = maxPlayers;
		i_gasLane = gasLane;
		i_subscriptionId = subscriptionId;
		i_callbackGasLimit = callbackGasLimit;
		s_gameState = GameState.OPEN;
		s_lastTimeStamp = block.timestamp;
		i_interval = interval;
	}

	function pushUniquePlayer(address newAddress) private {
		bool exists = false;
		for (uint256 i = 0; i < s_players.length; i++) {
			if (s_players[i] == newAddress) {
				exists = true;
				break;
			}
		}
		if (!exists) {
			if (s_players.length >= i_maxPlayers) {
				revert Roulette__ToManyPlayers();
			}
			s_players.push(newAddress);
		}
	}

	function resetEntries() private {
		for (uint256 i = 0; i < s_players.length; i++) {
			for (
				uint8 j = START_NUMBERS_INTERVAL;
				j <= END_NUMBERS_INTERVAL;
				j++
			) {
				s_entries[j][s_players[i]] = 0;
			}
		}
	}

	function enterRoulette(PlayerEntry[] memory playerEntries) public payable {
		if (msg.value < i_minBetValue) {
			revert Roulette__NotEnoughETHEntered();
		}
		s_totalBets += msg.value;
		if (
			s_totalBets >
			address(this).balance /
				(END_NUMBERS_INTERVAL - START_NUMBERS_INTERVAL)
		) {
			revert Roulette__ToMuchETHEntered();
		}
		if (s_gameState != GameState.OPEN) {
			revert Roulette__NotOpen();
		}
		uint256 totalBet;
		for (uint256 i = 0; i < playerEntries.length; i++) {
			uint8 number = playerEntries[i].number;
			uint256 value = playerEntries[i].value;

			if (
				number < START_NUMBERS_INTERVAL || number > END_NUMBERS_INTERVAL
			) {
				revert Roulette__InvalidBetNumbers();
			}
			s_entries[number][msg.sender] += value;
			totalBet += value;
		}
		if (totalBet != msg.value) {
			revert Roulette__InvalidBetValues();
		}
		pushUniquePlayer(msg.sender);
		emit RouletteEnter(msg.sender);
	}

	/**
	 * @dev This is the function that the Chainlink Keeper nodes call
	 * they look for `upkeepNeeded` to return True.
	 * the following should be true for this to return true:
	 * 1. The time interval has passed between roulette runs.
	 * 2. The game is open.
	 * 3. The game has bets.
	 * 4. Implicity, your subscription is funded with LINK.
	 */
	function checkUpkeep(
		bytes memory /* checkData */
	)
		public
		override
		returns (bool upkeepNeeded, bytes memory /* performData */)
	{
		bool isOpen = (GameState.OPEN == s_gameState);
		bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
		bool hasBets = (s_totalBets > 0);
		upkeepNeeded = (isOpen && timePassed && hasBets);
	}

	function performUpkeep(bytes calldata /* performData */) external override {
		(bool upkeepNeeded, ) = checkUpkeep("");
		if (!upkeepNeeded) {
			revert Roulette__UpkeepNotNeeded(s_totalBets, uint256(s_gameState));
		}
		s_gameState = GameState.CALCULATING;
		uint256 requestId = i_vrfCoordinator.requestRandomWords(
			i_gasLane,
			i_subscriptionId,
			REQUEST_CONFIRMATIONS,
			i_callbackGasLimit,
			NUM_WORDS
		);
		// This is redundant!
		emit RequestedRouletteWinner(requestId);
	}

	function fulfillRandomWords(
		uint256 /* requestId */,
		uint256[] memory randomWords
	) internal override {
		uint8 winningNumber = uint8(
			(randomWords[0] % (END_NUMBERS_INTERVAL - START_NUMBERS_INTERVAL)) +
				START_NUMBERS_INTERVAL
		);
		for (uint256 i = 0; i < s_players.length; i++) {
			address payable player = payable(s_players[i]);
			uint256 playerBetOnWinningNumber = s_entries[winningNumber][player];
			if (playerBetOnWinningNumber > 0) {
				(bool success, ) = player.call{
					value: (playerBetOnWinningNumber *
						(END_NUMBERS_INTERVAL - START_NUMBERS_INTERVAL))
				}("");
				if (!success) {
					revert Roulette__TransferFailed(player);
				}
			}
		}
		s_gameState = GameState.OPEN;
		resetEntries();
		delete s_players;
		s_totalBets = 0;
		s_lastWinningNumber = winningNumber;
		s_lastTimeStamp = block.timestamp;
		emit WinningNumberPicked(winningNumber);
	}

	function withdraw(uint256 amount) external onlyOwner {
		if (amount <= 0 || amount > (address(this).balance - s_totalBets)) {
			revert Roulette__InvalidWithdrawAmount();
		}
		(bool success, ) = payable(owner()).call{ value: amount }("");
		if (!success) {
			revert Roulette__TransferFailed(owner());
		}
	}

	receive() external payable {}

	/* View / Pure functions */
	function getPlayer(uint256 index) public view returns (address) {
		return s_players[index];
	}

	function getMaxPlayers() public view returns (uint256) {
		return i_maxPlayers;
	}

	function getTotalPlayers() public view returns (uint256) {
		return s_players.length;
	}

	function getMinBetValue() public view returns (uint256) {
		return i_minBetValue;
	}

	function getTotalBets() public view returns (uint256) {
		return s_totalBets;
	}

	function getLastWinningNumber() public view returns (uint8) {
		return s_lastWinningNumber;
	}

	function getGameState() public view returns (GameState) {
		return s_gameState;
	}

	function getNumWords() public pure returns (uint256) {
		return NUM_WORDS;
	}

	function getLatestTimeStamp() public view returns (uint256) {
		return s_lastTimeStamp;
	}

	function getRequestConfirmations() public pure returns (uint256) {
		return REQUEST_CONFIRMATIONS;
	}

	function getInterval() public view returns (uint256) {
		return i_interval;
	}
}
