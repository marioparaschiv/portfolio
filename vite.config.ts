import react from '@vitejs/plugin-react-swc';
import paths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';
import path from 'node:path';

// https://vitejs.dev/config/
const config: UserConfig = {
	plugins: [
		paths(),
		react()
	],
	resolve: {
		alias: [
			{ find: '~', replacement: path.resolve(__dirname, 'src') },
			{ find: '@', replacement: __dirname },
		],
	},
	server: {
		host: true,
		port: 80
	}
};

export default config;