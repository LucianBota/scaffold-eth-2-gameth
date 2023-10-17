export const secondsToMMSS = (seconds: number): string => {
	const minutes = Math.max(Math.floor(seconds / 60), 0);
	const remainingSeconds = Math.max(seconds % 60, 0);

	const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const secondsStr =
		remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

	return `${minutesStr}:${secondsStr}`;
};
