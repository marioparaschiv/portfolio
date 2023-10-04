import type { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import paths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config: UserConfig = {
	plugins: [
		react(),
		paths()
	]
};

export default config;