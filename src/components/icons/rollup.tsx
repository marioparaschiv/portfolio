import type { SVGProps } from 'react';

function Rollup(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
			<path fill='currentColor' d='M3.42 0a.37.37 0 0 0-.369.37v19.515c.577-1.488 1.557-3.617 3.138-6.53c5.7-10.479 6.447-11.536 9.415-11.536c1.56 0 3.134.704 4.152 1.955A7.96 7.96 0 0 0 13.101 0zm12.72 2.544c-1.19.01-2.258.466-2.699 1.498c-.967 2.256 1.624 4.767 2.757 4.568c1.442-.255-.255-3.563-.255-3.563c2.205 4.156 1.697 2.884-2.29 6.7c-3.986 3.815-8.057 11.872-8.651 12.21a.5.5 0 0 1-.08.043h15.636a.373.373 0 0 0 .33-.538L16.8 15.37a.37.37 0 0 1 .144-.488A7.96 7.96 0 0 0 20.95 7.97a7.9 7.9 0 0 0-1.03-3.92c-.927-.952-2.43-1.516-3.779-1.506z' />
		</svg>
	);
}

export default Rollup;