const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Roulette: {
          address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "vrfCoordinatorV2",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "minBetValue",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxPlayers",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "gasLane",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "subscriptionId",
                  type: "uint64",
                },
                {
                  internalType: "uint32",
                  name: "callbackGasLimit",
                  type: "uint32",
                },
                {
                  internalType: "uint256",
                  name: "interval",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "have",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "want",
                  type: "address",
                },
              ],
              name: "OnlyCoordinatorCanFulfill",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__InvalidBetNumbers",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__InvalidBetValues",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__InvalidWithdrawAmount",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__NotEnoughETHEntered",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__NotOpen",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__ToManyPlayers",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__ToMuchETHEntered",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "Roulette__TransferFailed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "totalBets",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rouletteState",
                  type: "uint256",
                },
              ],
              name: "Roulette__UpkeepNotNeeded",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
              ],
              name: "RequestedRouletteWinner",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "player",
                  type: "address",
                },
              ],
              name: "RouletteEnter",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint8",
                  name: "winningNumber",
                  type: "uint8",
                },
              ],
              name: "WinningNumberPicked",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "checkUpkeep",
              outputs: [
                {
                  internalType: "bool",
                  name: "upkeepNeeded",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint8",
                      name: "number",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "value",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Roulette.PlayerEntry[]",
                  name: "playerEntries",
                  type: "tuple[]",
                },
              ],
              name: "enterRoulette",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "getGameState",
              outputs: [
                {
                  internalType: "enum Roulette.GameState",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getInterval",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLastWinningNumber",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestTimeStamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMaxPlayers",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMinBetValue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getNumWords",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "getPlayer",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getRequestConfirmations",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "getTotalBets",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTotalPlayers",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "performUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "randomWords",
                  type: "uint256[]",
                },
              ],
              name: "rawFulfillRandomWords",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        VRFCoordinatorV2Mock: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint96",
                  name: "_baseFee",
                  type: "uint96",
                },
                {
                  internalType: "uint96",
                  name: "_gasPriceLink",
                  type: "uint96",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "InsufficientBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidConsumer",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidRandomWords",
              type: "error",
            },
            {
              inputs: [],
              name: "InvalidSubscription",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "MustBeSubOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "TooManyConsumers",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "consumer",
                  type: "address",
                },
              ],
              name: "ConsumerAdded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "consumer",
                  type: "address",
                },
              ],
              name: "ConsumerRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "outputSeed",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint96",
                  name: "payment",
                  type: "uint96",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "success",
                  type: "bool",
                },
              ],
              name: "RandomWordsFulfilled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "keyHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "preSeed",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
                {
                  indexed: false,
                  internalType: "uint16",
                  name: "minimumRequestConfirmations",
                  type: "uint16",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "callbackGasLimit",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "numWords",
                  type: "uint32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RandomWordsRequested",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "SubscriptionCanceled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "SubscriptionCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldBalance",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newBalance",
                  type: "uint256",
                },
              ],
              name: "SubscriptionFunded",
              type: "event",
            },
            {
              inputs: [],
              name: "BASE_FEE",
              outputs: [
                {
                  internalType: "uint96",
                  name: "",
                  type: "uint96",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "GAS_PRICE_LINK",
              outputs: [
                {
                  internalType: "uint96",
                  name: "",
                  type: "uint96",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MAX_CONSUMERS",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
              ],
              name: "acceptSubscriptionOwnerTransfer",
              outputs: [],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "address",
                  name: "_consumer",
                  type: "address",
                },
              ],
              name: "addConsumer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
              ],
              name: "cancelSubscription",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "address",
                  name: "_consumer",
                  type: "address",
                },
              ],
              name: "consumerIsAdded",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "createSubscription",
              outputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_requestId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_consumer",
                  type: "address",
                },
              ],
              name: "fulfillRandomWords",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_requestId",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "_consumer",
                  type: "address",
                },
                {
                  internalType: "uint256[]",
                  name: "_words",
                  type: "uint256[]",
                },
              ],
              name: "fulfillRandomWordsWithOverride",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "uint96",
                  name: "_amount",
                  type: "uint96",
                },
              ],
              name: "fundSubscription",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getConfig",
              outputs: [
                {
                  internalType: "uint16",
                  name: "minimumRequestConfirmations",
                  type: "uint16",
                },
                {
                  internalType: "uint32",
                  name: "maxGasLimit",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "stalenessSeconds",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "gasAfterPaymentCalculation",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getFallbackWeiPerUnitLink",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getFeeConfig",
              outputs: [
                {
                  internalType: "uint32",
                  name: "fulfillmentFlatFeeLinkPPMTier1",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "fulfillmentFlatFeeLinkPPMTier2",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "fulfillmentFlatFeeLinkPPMTier3",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "fulfillmentFlatFeeLinkPPMTier4",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "fulfillmentFlatFeeLinkPPMTier5",
                  type: "uint32",
                },
                {
                  internalType: "uint24",
                  name: "reqsForTier2",
                  type: "uint24",
                },
                {
                  internalType: "uint24",
                  name: "reqsForTier3",
                  type: "uint24",
                },
                {
                  internalType: "uint24",
                  name: "reqsForTier4",
                  type: "uint24",
                },
                {
                  internalType: "uint24",
                  name: "reqsForTier5",
                  type: "uint24",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getRequestConfig",
              outputs: [
                {
                  internalType: "uint16",
                  name: "",
                  type: "uint16",
                },
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
                {
                  internalType: "bytes32[]",
                  name: "",
                  type: "bytes32[]",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
              ],
              name: "getSubscription",
              outputs: [
                {
                  internalType: "uint96",
                  name: "balance",
                  type: "uint96",
                },
                {
                  internalType: "uint64",
                  name: "reqCount",
                  type: "uint64",
                },
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address[]",
                  name: "consumers",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "subId",
                  type: "uint64",
                },
              ],
              name: "pendingRequestExists",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "address",
                  name: "_consumer",
                  type: "address",
                },
              ],
              name: "removeConsumer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_keyHash",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "uint16",
                  name: "_minimumRequestConfirmations",
                  type: "uint16",
                },
                {
                  internalType: "uint32",
                  name: "_callbackGasLimit",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "_numWords",
                  type: "uint32",
                },
              ],
              name: "requestRandomWords",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint64",
                  name: "_subId",
                  type: "uint64",
                },
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "requestSubscriptionOwnerTransfer",
              outputs: [],
              stateMutability: "pure",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        Roulette: {
          address: "0xfcebef158be0a1d77c369c23655eb49771146610",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "vrfCoordinatorV2",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "gasLane",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "subscriptionId",
                  type: "uint64",
                },
                {
                  internalType: "uint32",
                  name: "callbackGasLimit",
                  type: "uint32",
                },
                {
                  internalType: "uint256",
                  name: "interval",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "have",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "want",
                  type: "address",
                },
              ],
              name: "OnlyCoordinatorCanFulfill",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__InvalidBetNumbers",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__InvalidBetValues",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__InvalidWithdrawAmount",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__NotEnoughETHEntered",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__NotOpen",
              type: "error",
            },
            {
              inputs: [],
              name: "Roulette__ToMuchETHEntered",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "Roulette__TransferFailed",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "totalBets",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rouletteState",
                  type: "uint256",
                },
              ],
              name: "Roulette__UpkeepNotNeeded",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
              ],
              name: "RequestedRouletteWinner",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint8",
                  name: "winningNumber",
                  type: "uint8",
                },
              ],
              name: "WinningNumberPicked",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "checkUpkeep",
              outputs: [
                {
                  internalType: "bool",
                  name: "upkeepNeeded",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint8",
                      name: "number",
                      type: "uint8",
                    },
                    {
                      internalType: "uint256",
                      name: "value",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Roulette.PlayerEntry[]",
                  name: "playerEntries",
                  type: "tuple[]",
                },
              ],
              name: "enterRoulette",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "getGameState",
              outputs: [
                {
                  internalType: "enum Roulette.GameState",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getInterval",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLastWinningNumber",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestTimeStamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getNumWords",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
              ],
              name: "getPlayer",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getRequestConfirmations",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [],
              name: "getTotalBets",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTotalPlayers",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "performUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "randomWords",
                  type: "uint256[]",
                },
              ],
              name: "rawFulfillRandomWords",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
