import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import { Code } from 'lucide-react';

export const path = '/projects';
export const element = Projects;
export const order = 3;

function Projects() {
	return <Page section='Projects' className='p-0 flex min-h-screen w-screen items-center justify-center'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500'>
			<Code className='text-neutral-400' size={256} strokeWidth={2} />
			<Typography tag='h1' className='font-semibold bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent'>
				Under construction.
			</Typography>
		</div>
	</Page>;
};