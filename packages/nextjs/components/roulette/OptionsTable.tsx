import { Fragment } from "react";

import TableCell from "./TableCell";
import { Bet } from "~~/types/roulette/bets";
import { CellColor } from "~~/enums/roulette";

const OptionsTable = (props: {
	defaultTableCellValue: number[];
	currentBetValue: number;
	setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
	startNumber: number;
	endNumber: number;
	redNumbers: number[];
	blackNumbers: number[];
}) => {
	const cellsText = [
		["1st 12", "2nd 12", "3rd 12"],
		[
			`${props.startNumber + 1} to ${
				(props.startNumber + props.endNumber) / 2
			}`,
			"EVEN",
			"RED",
			"BLACK",
			"ODD",
			`${(props.startNumber + props.endNumber) / 2 + 1} to ${props.endNumber}`,
		],
	]; //frequency vector, for each cell index you have the text

	const getRows = () => {
		const rows: Array<Array<number[] | null>> = [
			[null],
			[null, [], null, [], null, [], null],
			[null],
			[null, [], null, [], null, [], null, [], null, [], null, [], null],
			[null],
		];
		const numbers = Array.from(
			{ length: props.endNumber },
			(_, index) => index + 1
		); //array with numbers from 1 to 36

		//first row
		let numbersCopy = [...numbers];
		for (let i = 1; i <= 5; i = i + 2) {
			rows[1][i] = [
				...numbersCopy.splice(0, (props.endNumber - props.startNumber) / 3),
			];
		}

		//second row
		numbersCopy = [...numbers];
		//first half
		rows[3][1] = [
			...numbersCopy.splice(0, (props.endNumber - props.startNumber) / 2),
		];
		//second half
		rows[3][11] = [
			...numbersCopy.splice(0, (props.endNumber - props.startNumber) / 2),
		];
		//even
		rows[3][3] = numbers.filter((number) => number % 2 === 0);
		//odd
		rows[3][9] = numbers.filter((number) => number % 2 !== 0);
		//red
		rows[3][5] = props.redNumbers;
		//black
		rows[3][7] = props.blackNumbers;

		return rows;
	};
	return (
		<div className="max-w-[126px] min-w-[126px] rotate-90">
			<div
				className="grid"
				style={{
					gridTemplateColumns: `${"6px 94px ".repeat(6)}6px`,
					gridTemplateRows: "6px 54px 6px 54px 6px",
				}}
			>
				{getRows().map((row, rowIndex) => {
					return (
						<Fragment key={rowIndex}>
							{row.map((cell, cellIndex) => {
								return (
									<TableCell
										key={cellIndex}
										defaultValue={props.defaultTableCellValue}
										currentBetValue={props.currentBetValue}
										setBets={props.setBets}
										color={
											cell?.length && rowIndex > 0
												? cellsText[(rowIndex - 1) / 2][(cellIndex - 1) / 2] ===
												  "RED"
													? CellColor.red
													: cellsText[(rowIndex - 1) / 2][
															(cellIndex - 1) / 2
													  ] === "BLACK"
													? CellColor.black
													: CellColor.transparent
												: CellColor.solid
										}
										value={cell}
										colSpan={
											row.length === 1
												? 13
												: cell?.length && row.length === 7
												? 3
												: 1
										}
										text={
											cell?.length && rowIndex > 0
												? cellsText[(rowIndex - 1) / 2][(cellIndex - 1) / 2]
														.replace("RED", "")
														.replace("BLACK", "")
												: undefined
										}
									/>
								);
							})}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default OptionsTable;
