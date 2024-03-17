import { useBreakpoint } from '~/components/hooks';
import { Page } from '~/components/layout';
import Tag from '~/components/tag';

export const path = '/';
export const element = Home;

export const header = true;
export const order = 1;

function Home() {
	const isMedium = useBreakpoint('md');

	return <Page className='p-0 flex min-h-screen w-screen items-center justify-center overflow-hidden'>
		<div className='relative flex h-screen w-full flex-col items-center justify-center gap-4 overflow-x-clip'>
			<div
				className='absolute z-0 h-[1000px] w-[1000px] opacity-30 animate-in fade-in zoom-in-0 duration-1000 ease-out'
				style={{
					background: `radial-gradient(${isMedium ? 50 : 30}% ${isMedium ? 50 : 30}% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(0, 0, 0, 0) 100%)`
				}}
			/>
			<Tag href='https://www.google.com/maps/place/London/' className='animate-in fade-in zoom-in-105 slide-in-from-bottom-8 duration-300'>
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
};