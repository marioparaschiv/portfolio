import Typography from '~/components/typography';
import { PersonStanding } from 'lucide-react';
import { Page } from '~/components/layout';

export const path = '/about';
export const element = About;
export const order = 2;

function About() {
	return <Page section='About' className='p-0 flex min-h-screen w-screen items-center justify-center'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent'>
			<PersonStanding className='text-neutral-500' size={256} strokeWidth={2} />
			<Typography tag='h1' className='font-semibold'>
				Under construction.
			</Typography>
		</div>
	</Page>;
};