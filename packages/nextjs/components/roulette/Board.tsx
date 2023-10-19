import ColumnsTable from "./ColumnsTable";
import NumbersTable from "./NumbersTable";
import OptionsTable from "./OptionsTable";
import { Bet } from "~~/types/roulette/bets";

const Board = (props: {
	defaultTableCellValue: number[];
	currentBetValue: number;
	setBets: React.Dispatch<React.SetStateAction<Bet[]>>;
}) => {
	const startNumber = 0;
	const endNumber = 36;
	const numbersTableColumns = 3;
	const redNumbers = [
		1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
	];
	const blackNumbers = [
		2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
	];

	return (
		<div className="flex justify-between min-w-[320px] max-w-[320px] my-10">
			<div className="relative mt-[50px]">
				<OptionsTable
					defaultTableCellValue={props.defaultTableCellValue}
					currentBetValue={props.currentBetValue}
					setBets={props.setBets}
					startNumber={startNumber}
					endNumber={endNumber}
					redNumbers={redNumbers}
					blackNumbers={blackNumbers}
				/>
			</div>
			<div className="relative">
				<NumbersTable
					defaultTableCellValue={props.defaultTableCellValue}
					currentBetValue={props.currentBetValue}
					setBets={props.setBets}
					startNumber={startNumber}
					endNumber={endNumber}
					columns={numbersTableColumns}
					redNumbers={redNumbers}
					blackNumbers={blackNumbers}
				/>
				<ColumnsTable
					defaultTableCellValue={props.defaultTableCellValue}
					currentBetValue={props.currentBetValue}
					setBets={props.setBets}
					startNumber={startNumber}
					endNumber={endNumber}
					columns={numbersTableColumns}
				/>
			</div>
		</div>
	);
};

export default Board;
