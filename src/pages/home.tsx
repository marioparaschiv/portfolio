import { useBreakpoint } from '~/components/hooks';
import { Page } from '~/components/layout';
import Tag from '~/components/tag';
import config from '@config.json';

export const path = '/';
export const element = Home;

export const showInHeader = true;
export const headerOrder = 1;

function Home() {
	const isMedium = useBreakpoint('md');

	return <Page className='flex justify-center items-center p-0 w-screen min-h-screen overflow-hidden'>
		<div className='relative flex flex-col justify-center items-center gap-4 w-full h-screen overflow-x-clip'>
			<div
				className='z-0 absolute opacity-30 zoom-in-0 w-[1000px] h-[1000px] animate-in duration-1000 ease-out fade-in'
				style={{ background: `radial-gradient(${isMedium ? 50 : 30}% ${isMedium ? 50 : 30}% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(0, 0, 0, 0) 100%)` }}
			/>
			<Tag href='https://www.google.com/maps/place/London/' className='slide-in-from-bottom-8 zoom-in-105 animate-in duration-300 fade-in'>
				{config.location}
			</Tag>
			<div className='slide-in-from-bottom-8 bg-clip-text bg-gradient-to-br from-white to-neutral-500 zoom-in-105 font-bold text-5xl text-center text-transparent sm:text-6xl animate-in duration-500 fade-in-0'>
				{config.title}
			</div>
			<div className='slide-in-from-bottom-8 zoom-in-105 px-8 sm:px-0 font-medium text-center text-neutral-400 text-sm sm:text-base animate-in duration-700 fade-in'>
				{config.subtext}
			</div>
		</div>
	</Page>;
};