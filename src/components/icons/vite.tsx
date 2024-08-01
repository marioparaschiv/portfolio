import type { SVGProps } from 'react';

function Vite(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
			<g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
				<path d='M10 4.5L16 3l-2 6.5l2-.5l-4 7v-5l-3 1z' />
				<path d='M15 6.5L22 5L12 22L2 5l7.741 1.5' />
			</g>
		</svg>
	);
}

export default Vite;