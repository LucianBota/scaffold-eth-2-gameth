import { Fragment } from "react";

import TableCell from "./TableCell";
import { Bet } from "~~/types/roulette/bets";
import { CellColor } from "~~/enums/roulette";

const ColumnsTable = (props: {
	defaultTableCellValue: number[];
	currentBetValue: number;
	setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
	startNumber: number;
	endNumber: number;
	columns: number;
}) => {
	const getRows = () => {
		const rows: Array<Array<number[] | null>> = [[], [null]];
		const numbers = Array.from(
			{ length: props.endNumber },
			(_, index) => index + 1
		); //array with numbers from 1 to 36
		for (let i = 0; i < props.columns; i++) {
			rows[0].push(null);
			rows[0].push(
				numbers.filter(
					(number) => number % props.columns === (i + 1) % props.columns
				)
			);
		}
		rows[0].push(null);

		return rows;
	};
	return (
		<div
			className="grid"
			style={{
				gridTemplateColumns: `${"6px 56px ".repeat(props.columns)}6px`,
				gridTemplateRows: "44px 6px",
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
									color={cell?.length ? CellColor.transparent : CellColor.solid}
									value={cell}
									colSpan={row.length === 1 ? 7 : 1}
									text={cell?.length ? "2:1" : undefined}
								/>
							);
						})}
					</Fragment>
				);
			})}
		</div>
	);
};

export default ColumnsTable;
