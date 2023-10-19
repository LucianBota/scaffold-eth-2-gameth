import { useEffect, useState } from "react";
import Image from "next/image";

import PlaceBetButton from "./PlaceBetButton";
import BetValueInput from "./BetValueInput";
import {
	useScaffoldContractRead,
	useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";
import { secondsToMMSS } from "~~/utils/dateTime";
import { Bet } from "~~/types/roulette/bets";
import rouleteSVG from "../../public/assets/roulette.svg";
import targetSVG from "../../public/assets/target.svg";

const Wheel = (props: {
	bets: Bet[];
	currentBetValue: number;
	resetBets: () => void;
	setCurrentBetValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [radius, setRadius] = useState<number>(0);
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [isRolling, setIsRolling] = useState<boolean>(false);

	const wheelNumbers = [
		0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
		24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
	];
	const animationDuration = 10;
	const fullRotations = 3;

	const { data: timeInterval } = useScaffoldContractRead({
		contractName: "Roulette",
		functionName: "getInterval",
	});

	const { data: latestTimeStamp } = useScaffoldContractRead({
		contractName: "Roulette",
		functionName: "getLatestTimeStamp",
	});

	const { data: totalPlayers } = useScaffoldContractRead({
		contractName: "Roulette",
		functionName: "getTotalPlayers",
	});

	const rollWheel = (number: number) => {
		setRadius(
			(prev) =>
				Math.floor(prev / 360) * 360 +
				fullRotations * 360 -
				(360 / 37) *
					(wheelNumbers.indexOf(number) + (Math.random() - 0.5) / 1.2)
		);
	};

	useScaffoldEventSubscriber({
		contractName: "Roulette",
		eventName: "WinningNumberPicked",
		listener: (logs) => {
			logs.map((log) => {
				const { winningNumber } = log.args;
				console.log("📡 WinningNumberPicked event", winningNumber);
				if (winningNumber) {
					setIsRolling(true);
					rollWheel(winningNumber);
					setTimeout(() => {
						setIsRolling(false);
					}, 15000);
				}
			});
		},
	});

	useEffect(() => {
		let timeLeft = 0;
		if (latestTimeStamp && timeInterval) {
			timeLeft =
				Number(latestTimeStamp + timeInterval) - Math.floor(Date.now() / 1000);
		}

		const intervalID = setInterval(() => {
			if (timeLeft > 0) {
				setTimeLeft(--timeLeft);
			} else {
				setTimeLeft(0);
				clearInterval(intervalID);
			}
		}, 1000);

		return () => {
			clearInterval(intervalID);
		};
	}, [latestTimeStamp, timeInterval]);

	return (
		<div className="flex items-center flex-col flex-grow max-w-[540px] min-w-[320px] h-full pt-10">
			<div className="relative h-8 my-1 aspect-square">
				<Image className="rotate-180" alt="target-image" fill src={targetSVG} />
			</div>
			<div className="flex items-center justify-center relative max-w-[540px] max-h-[540px] w-full aspect-square overflow-hidden">
				{isRolling ? (
					<p className="w-1/2 text-2xl pb-2 text-center">
						Extracting number...
					</p>
				) : totalPlayers === 0n ? (
					<p className="w-1/2 text-2xl pb-2 text-center">
						Waiting for players...
					</p>
				) : timeLeft ? (
					<p className="w-1/2 text-2xl pb-10 text-center">
						Next spin in:
						<br />
						<span className="text-6xl">{secondsToMMSS(timeLeft)}</span>
					</p>
				) : (
					<p className="w-1/2 text-2xl pb-2 text-center">Calculating...</p>
				)}
				<Image
					className="aspect-square"
					alt="roulette-image"
					fill
					src={rouleteSVG}
					style={{
						transform: `rotate(${radius}deg)`,
						transition:
							radius > 360
								? `transform ${animationDuration}s cubic-bezier(0.2, 0.2, 0, 1)`
								: undefined,
					}}
				/>
			</div>
			<div className="mt-10">
				<PlaceBetButton
					isDisabled={!!totalPlayers && !timeLeft}
					data={props.bets}
					resetBets={props.resetBets}
				/>
				<BetValueInput
					currentBetValue={props.currentBetValue}
					setCurrentBetValue={props.setCurrentBetValue}
				/>
			</div>
		</div>
	);
};

export default Wheel;
