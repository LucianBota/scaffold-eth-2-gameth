/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./utils/**/*.{js,ts,jsx,tsx}",
	],
	plugins: [require("daisyui")],
	darkTheme: "scaffoldEthDark",
	// DaisyUI theme colors
	daisyui: {
		themes: [
			{
				scaffoldEth: {
					primary: "#93BBFB",
					"primary-content": "#212638",
					secondary: "#DAE8FF",
					"secondary-content": "#212638",
					accent: "#93BBFB",
					"accent-content": "#212638",
					neutral: "#212638",
					"neutral-content": "#ffffff",
					"base-100": "#ffffff",
					"base-200": "#f4f8ff",
					"base-300": "#DAE8FF",
					"base-content": "#212638",
					info: "#93BBFB",
					success: "#34EEB6",
					warning: "#FFCF72",
					error: "#FF8863",

					"--rounded-btn": "9999rem",

					".tooltip": {
						"--tooltip-tail": "6px",
					},
				},
			},
			{
				scaffoldEthDark: {
					primary: "#2a2a2a",
					"primary-content": "#fbfbfb",
					secondary: "#464646",
					"secondary-content": "#fbfbfb",
					accent: "#737373",
					"accent-content": "#fbfbfb",
					neutral: "#fbfbfb",
					"neutral-content": "#595959",
					"base-100": "#595959",
					"base-200": "#3c3c3c",
					"base-300": "#2a2a2a",
					"base-content": "#fbfbfb",
					info: "#595959",
					success: "#34EEB6",
					warning: "#FFCF72",
					error: "#FF8863",

					"--rounded-btn": "9999rem",

					".tooltip": {
						"--tooltip-tail": "6px",
						"--tooltip-color": "hsl(var(--p))",
					},
				},
			},
		],
	},
	theme: {
		// Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
		extend: {
			fontFamily: {
				"bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
			},
			boxShadow: {
				center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
			},
			keyframes: {
				grow: {
					"0%": {
						width: "0%",
					},
					"100%": {
						width: "100%",
					},
				},
				zoom: {
					"0%, 100%": { transform: "scale(1, 1)" },
					"50%": { transform: "scale(1.1, 1.1)" },
				},
			},
			animation: {
				grow: "grow 5s linear infinite",
				"pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				zoom: "zoom 1s ease infinite",
				"ping-once": "ping 1s cubic-bezier(0, 0, 0.2, 1)",
			},
		},
	},
};
