import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/carousel';
import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import { Code } from 'lucide-react';
import { useState } from 'react';
import { cn } from '~/utils';

export const path = '/projects';
export const element = Projects;
export const order = 3;

function Projects() {
	const [idx, setIdx] = useState(0);
	// const carousel = useCarousel();
	// const selected = Math.round(carousel.api?.selectedScrollSnap() ?? 0);

	return <Page section='Projects' className='p-0 flex min-h-screen items-center justify-center'>
		{import.meta.env.DEV ? <>
			<Carousel opts={{ startIndex: 12 % 2 || 12 / 2 }} className='mx-24'>
				<div className='flex flex-col'>
					<CarouselContent className='[&>div]:flex [&>div]:justify-center [&>div]:items-center'>
						{new Array(12).fill(null).map(() => <CarouselItem>
							<Project name='hi' type='test' />
						</CarouselItem>)}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</div>
			</Carousel>
			<div className='flex gap-2 mt-6'>
				{new Array(12).fill(null).map((_, index) => <div className={cn('w-3 h-3 rounded-full bg-neutral-800', idx === index && 'bg-white')}>

				</div>)}
			</div>
		</> : <div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500'>
			<Code className='text-neutral-400' size={256} strokeWidth={2} />
			<Typography tag='h1' className='font-semibold bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent'>
				Under construction.
			</Typography>
		</div>}
	</Page>;
}

interface ProjectProps {
	name: string;
	type: string;

}

function Project(props: ProjectProps) {
	// const carousel = useCarousel();
	// const selected = Math.round(carousel.api?.selectedScrollSnap() ?? 0);

	return <div className='flex items-center justify-center overflow-hidden rounded-3xl relative border border-neutral-800 bg-neutral-900'>
		<img
			className='select-none w-auto h-auto'
			alt={props.name}
			src='https://storage.googleapis.com/hippostcard/p/45be7d5693d5873bd9af365254387a44-800.jpg'
		/>
		<div className='absolute z-10 h-full w-full bg-gradient-to-t from-black/80 to-black/20'>
			<div className='relative flex justify-center items-center h-full'>

				Hello!
			</div>
		</div>
	</div>;
	// return <div className='absolute h-[500px] w-[500px] flex items-center justify-center overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900'>
	// 	<div className='relative flex items-center justify-center'>
	// 		<img alt={props.name} width={1920} height={1080} src='https://reece.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fflare.4e6cf660.png&w=3840&q=100' srcSet='https://reece.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fflare.4e6cf660.png&w=1080&q=100 1x, https://reece.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fflare.4e6cf660.png&w=3840&q=100 2x' />
	// 		<div className='absolute z-10 h-full w-full bg-gradient-to-t from-black to-black/20'>
	// 			<div className='flex h-full flex-col items-center justify-center gap-4'>
	// 				hello!!!
	// 				<Button>
	// 					View project
	// 				</Button>
	// 			</div>
	// 		</div>
	// 		{/* <div className='flex h-full flex-col items-center justify-center gap-4'>
	// 		idi</div> */}
	// 	</div>;
	// </div>;
};;