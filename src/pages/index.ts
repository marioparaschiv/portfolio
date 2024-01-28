export * as Home from './home';
export * as Contact from './contact';
export * as Projects from './projects';
export * as About from './about';

export type Page = {
	element: React.ComponentType;
	path: string;
};