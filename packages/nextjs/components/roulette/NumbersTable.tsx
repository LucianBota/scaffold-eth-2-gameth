import { Fragment } from "react";

import TableCell from "./TableCell";
import { Bet } from "~~/types/roulette/bets";
import { CellColor } from "~~/enums/roulette";

const NumbersTable = (props: {
	defaultTableCellValue: number[];
	currentBetValue: number;
	setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
	startNumber: number;
	endNumber: number;
	columns: number;
	redNumbers: number[];
	blackNumbers: number[];
}) => {
	const getRows = () => {
		const rows: Array<Array<number[] | null>> = [[null], [null, [0], null]];
		for (let i = props.startNumber + 1; i <= props.endNumber; i++) {
			if (i % props.columns === 1) {
				rows.push([], []);

				//full row cell
				let fullRowValues = Array.from(
					{ length: props.columns },
					(_, index) => i + index
				);
				rows[rows.length - 1].push(fullRowValues);

				//double full row cell
				let fullPreviousRowValues = Array.from(
					{ length: props.columns },
					(_, index) => i - props.columns + index
				).filter((number) => number >= 0);
				rows[rows.length - 2].push(fullPreviousRowValues.concat(fullRowValues));
			}

			//single cell
			rows[rows.length - 1].push([i]);

			//double vertical cell
			rows[rows.length - 2].push([
				Math.max(i - props.columns, props.startNumber),
				i,
			]);

			if (i % props.columns != 0) {
				//triple / quadruple cell
				rows[rows.length - 2].push([
					...(i - props.columns < props.startNumber
						? [props.startNumber]
						: [i - props.columns, i - props.columns + 1]),
					i,
					i + 1,
				]);

				//double horizontal cell
				rows[rows.length - 1].push([i, i + 1]);
			} else {
				//empty triple / quadruple cell
				rows[rows.length - 2].push(null);

				//empty double horizontal cell
				rows[rows.length - 1].push(null);
			}
		}
		rows.push([null]);

		return rows;
	};

	return (
		<div
			className="grid"
			style={{
				gridTemplateColumns: `${"6px 56px ".repeat(props.columns)}6px`,
				gridTemplateRows: `${"6px 44px ".repeat(
					(props.endNumber - props.startNumber) / 3 + 1
				)}6px`,
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
										cell?.length === 1
											? props.redNumbers.includes(cell[0])
												? CellColor.red
												: props.blackNumbers.includes(cell[0])
												? CellColor.black
												: CellColor.green
											: CellColor.solid
									}
									value={cell}
									colSpan={
										row.length === 1 ? 7 : row.length === 3 && cell ? 5 : 1
									}
									text={cell?.length === 1 ? cell.toString() : undefined}
								/>
							);
						})}
					</Fragment>
				);
			})}
		</div>
	);
};

export default NumbersTable;
