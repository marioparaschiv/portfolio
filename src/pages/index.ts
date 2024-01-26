export * as Home from './home';
export * as Projects from './projects';
export * as Contact from './contact';

export type Page = {
	element: React.ComponentType;
	path: string;
};