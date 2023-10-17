import { useState } from "react";

import Wheel from "~~/components/roulette/Wheel";
import Board from "~~/components/roulette/Board";
import { Bet } from "~~/types/roulette/bets";

const Roulette = () => {
	const [currentBetValue, setCurrentBetValue] = useState<number>(0.1);
	const [bets, setBets] = useState<Bet[]>([]);

	return (
		<>
			<div className="flex flex-col md:flex-row justify-evenly items-center">
				<Wheel
					bets={bets}
					currentBetValue={currentBetValue}
					setCurrentBetValue={setCurrentBetValue}
				/>
				<Board currentBetValue={currentBetValue} setBets={setBets} />
			</div>
		</>
	);
};

export default Roulette;
