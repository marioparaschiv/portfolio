import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import { Code } from 'lucide-react';

export const path = '/projects';
export const element = Projects;

function Projects() {
	return <Page section='Projects' className='p-5 md:p-10'>
		<div className='flex items-center gap-8 flex-col w-full h-full m-auto'>
			<Code className='text-foreground-secondary' size={256} />
			<Typography tag='h1' className='font-semibold text-foreground-secondary'>
				Under construction.
			</Typography>
		</div>
	</Page>;
};