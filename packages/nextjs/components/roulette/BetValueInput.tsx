import { ChangeEvent } from "react";

const BetValueInput = (props: {
	currentBetValue: number;
	setCurrentBetValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numericValue = Number(Number(e.target.value).toFixed(1));
		props.setCurrentBetValue(numericValue);
	};

	return (
		<input
			type="number"
			placeholder="Enter the bet value"
			className="input w-full my-5 px-5 border border-primary text-2xl text-right"
			value={props.currentBetValue}
			onChange={handleInputChange}
		/>
	);
};

export default BetValueInput;
