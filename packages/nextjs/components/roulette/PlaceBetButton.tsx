import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

import { Bet, BetBigInt } from "~~/types/roulette/bets";

const PlaceBetButton = (props: {
	isDisabled: boolean;
	data: Bet[];
	resetBets: () => void;
}) => {
	const [totalBetsValue, setTotalBetsValue] = useState<number>(0);

	const getTotalBetsValue = (entries: Bet[]): number => {
		let total: number = 0;
		entries.forEach((entry) => {
			total += entry.value;
		});
		return parseFloat(total.toFixed(9));
	};

	const convertBetsToBetBigInt = (entries: Bet[]): BetBigInt[] => {
		return entries.map((entry) => ({
			number: entry.number,
			value: parseEther(entry.value.toString()),
		}));
	};

	useEffect(() => {
		setTotalBetsValue(getTotalBetsValue(props.data));
	}, [props.data]);

	const { writeAsync, isLoading } = useScaffoldContractWrite({
		contractName: "Roulette",
		functionName: "enterRoulette",
		args: [convertBetsToBetBigInt(props.data)],
		value: `${totalBetsValue}`,
		onBlockConfirmation: (txnReceipt) => {
			console.log("📦 Transaction blockHash", txnReceipt.blockHash);
			props.resetBets();
		},
	});

	return (
		<button
			className="btn btn-primary rounded-full capitalize font-normal font-white w-80 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
			disabled={props.isDisabled || isLoading || totalBetsValue === 0}
			onClick={() => writeAsync()}
		>
			Place Bet ({totalBetsValue.toFixed(4)})
		</button>
	);
};

export default PlaceBetButton;
