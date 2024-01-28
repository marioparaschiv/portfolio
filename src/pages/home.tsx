import { Page } from '~/components/layout';
import Tag from '~/components/tag';

export const path = '/';
export const element = Home;
export const order = 1;

function Home() {
	return <Page className='p-0 flex min-h-screen w-screen items-center justify-center'>
		<div className='relative flex h-screen w-full flex-col items-center justify-center gap-4 overflow-x-clip'>
			<div className='absolute z-0 h-[1000px] w-[1000px] opacity-30 animate-in fade-in zoom-in-0 duration-1000 ease-out' style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(0, 0, 0, 0) 100%)' }} />
			<Tag className='animate-in fade-in zoom-in-105 slide-in-from-bottom-8 duration-300'>
				London, United Kingdom
			</Tag>
			<div className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-center text-5xl font-bold text-transparent animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 sm:text-6xl'>
				Mario Paraschiv.
			</div>
			<div className='px-8 text-center text-sm font-medium text-neutral-400 animate-in fade-in zoom-in-105 slide-in-from-bottom-8 duration-700 sm:px-0 sm:text-base'>
				Full stack developer devoted to creating fluid and easy to use software.
			</div>
		</div>
	</Page>;
}