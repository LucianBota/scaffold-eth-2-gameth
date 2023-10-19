import { useEffect, useState } from "react";

import PlacedBet from "./PlacedBet";
import { Bet } from "~~/types/roulette/bets";
import { CellColor } from "~~/enums/roulette";

const TableCell = (props: {
	defaultValue: number[];
	currentBetValue: number;
	setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
	colSpan: number;
	color: CellColor;
	value: number[] | null;
	text?: string | null;
}) => {
	const [totalCellBetValue, setTotalCellBetValue] = useState<number>(0);

	useEffect(() => {
		setTotalCellBetValue(props.defaultValue[0]);
	}, [props.defaultValue]);

	return (
		<div
			className={`flex justify-center items-center text-2xl`}
			onClick={
				props.value
					? () => {
							setTotalCellBetValue((prev) => (prev += props.currentBetValue));
							props.setBets((prev) => {
								const newBets = [...prev];
								props.value!.forEach((number) => {
									newBets.push({
										number,
										value: parseFloat(
											(props.currentBetValue / props.value!.length).toFixed(9)
										),
									});
								});
								return newBets;
							});
					  }
					: undefined
			}
			style={{
				gridColumn: `span ${props.colSpan} / span ${props.colSpan}`,
				backgroundColor: props.color || undefined,
				color:
					props.color === CellColor.green || props.color === CellColor.red
						? "#fff"
						: props.color === CellColor.black
						? "#000"
						: undefined,
			}}
		>
			{props.text || null}
			<PlacedBet value={totalCellBetValue} />
		</div>
	);
};

export default TableCell;
