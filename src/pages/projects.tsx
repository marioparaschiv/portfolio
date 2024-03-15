import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from '~/components/carousel';
import Information from '~/../information/projects.json';
import Typography from '~/components/typography';
import { ArrowRight, Code } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Page } from '~/components/layout';
import Button from '~/components/button';
import { cn } from '~/utils';

export const path = '/projects';
export const element = Projects;
export const order = 3;

function Projects() {
	return <Page section='Projects' className='p-0 flex min-h-screen items-center justify-center overflow-hidden'>
		<div className='flex items-center gap-16 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500'>
			<Typography tag='h1' className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent font-semibold'>
				Projects.
			</Typography>
			{import.meta.env.DEV ? <>
				<Carousel opts={{ align: 'center', startIndex: 12 % 2 || 12 / 2, skipSnaps: true, loop: true }}>
					<div className='flex flex-col'>
						<CarouselContent className='[&>div]:flex [&>div]:justify-center [&>div]:items-center'>
							{Information.map((project, index) => <CarouselItem key={index}>
								<Project {...project} />
							</CarouselItem>)}
						</CarouselContent>
					</div>
					<div className='flex justify-center mt-6 mx-24'>
						<CarouselDots />
						<div className='flex items-center justify-center ml-auto gap-2'>
							<CarouselPrevious />
							<CarouselNext />
						</div>
					</div>
				</Carousel>
			</> : <>
				<Code className='text-neutral-400' size={256} strokeWidth={2} />
				<Typography tag='h1' className='font-semibold bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent'>
					Under construction.
				</Typography>
			</>}
		</div>
	</Page>;
}

function Project(props: ArrayToTuple<typeof Information>) {
	const [width, setWidth] = useState<number>(window.innerWidth >= 1080 ? 1080 : window.innerWidth - 50);

	useEffect(() => {
		function onResize() {
			setWidth(window.innerWidth >= 1080 ? 1080 : window.innerWidth - 50);
		}

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, []);

	return <div className='flex items-center justify-center overflow-hidden rounded-3xl relative border border-neutral-800 bg-neutral-900'>
		<img
			loading='eager'
			decoding='async'
			className='select-none h-auto max-h-[35rem] object-cover'
			alt={props.name}
			style={{ width }}
			src={props.thumbnail}
			onError={(event) => (event.target as HTMLImageElement).src = '/img/projects/fallback.png'}
		/>
		<div className='absolute z-10 h-full w-full bg-gradient-to-t from-black/80 to-black/20'>
			<div className='relative flex flex-col justify-center items-center h-full'>
				<img
					loading='eager'
					decoding='async'
					className={cn('h-12 mb-4 rounded-md', props.iconStyles)}
					src={props.icon}
				/>
				<div className='flex flex-col items-center justify-center mb-2'>
					<Typography tag='h3' margin={false} padding={false} border={false}>
						{props.name}
					</Typography>
					<Typography tag='h5' className='text-lg font-normal text-foreground-secondary'>
						{props.type}
					</Typography>
					<Typography tag='h6' border={false} className='font-normal text-foreground-secondary/60 text-xs'>
						{props.timeFrame}
					</Typography>
				</div>
				<Button className='border-neutral-800 bg-neutral-900 gap-2 text-xs pt-0 pb-0' size='sm' variant='outline'>
					View project <ArrowRight size={14} />
				</Button>
			</div>
		</div>
	</div>;
}

function CarouselDots() {
	const carousel = useCarousel();
	const [idx, setIndex] = useState(Math.round(carousel.api?.selectedScrollSnap() ?? 0));

	useEffect(() => {
		function onSlideChange() {
			const selected = carousel.api?.selectedScrollSnap() ?? 0;

			setIndex(selected);
		}

		carousel.api?.on('scroll', onSlideChange);

		return () => void carousel.api?.off('scroll', onSlideChange);
	}, [carousel.api]);

	return <div className='flex gap-2 justify-center items-center'>
		{Information.map((_, index) => <div
			key={index}
			className={cn('w-3 h-3 cursor-pointer rounded-full bg-neutral-800', idx === index && 'bg-white')}
			onClick={() => carousel.api?.scrollTo(index)}
		/>)}
	</div>;
}