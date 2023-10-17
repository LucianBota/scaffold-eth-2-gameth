import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

import Roulette from "~~/components/roulette/Roulette";

const Home: NextPage = () => {
	return (
		<>
			<MetaHeader />
			<Roulette />
		</>
	);
};

export default Home;
