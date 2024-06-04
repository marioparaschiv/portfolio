import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from '~/components/carousel';
import Typography from '~/components/typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Page } from '~/components/layout';
import { ArrowRight, Code } from 'lucide-react';
import Button from '~/components/button';
import { cn, median } from '~/utils';
import config from '@config.json';

export const path = '/projects';
export const element = Projects;

export const showInHeader = true;
export const headerOrder = 3;


function Projects() {
	return <Page section='Projects' className='flex justify-center items-center p-0 min-h-dvh overflow-hidden'>
		<div className='slide-in-from-bottom-8 flex flex-col items-center gap-16 m-auto zoom-in-105 animate-in duration-500 fade-in-0'>
			{import.meta.env.DEV ? <Carousel className='mt-5 h-full' opts={{
				align: 'center',
				startIndex: config.projects.length % 2 === 0 ? config.projects.length / 2 : median([...new Array(config.projects.length).keys()]),
				skipSnaps: true,
				loop: true
			}}>
				<div className='flex flex-col'>
					<CarouselContent className='[&>div]:flex [&>div]:justify-center [&>div]:items-center'>
						{config.projects.map((project, index) => <CarouselItem key={index}>
							<Project {...project} />
						</CarouselItem>)}
					</CarouselContent>
				</div>
				<div className='flex justify-center mx-12 md:mx-24 mt-6'>
					<CarouselDots />
					<div className='flex justify-center items-center gap-2 ml-auto'>
						<CarouselPrevious />
						<CarouselNext />
					</div>
				</div>
			</Carousel> : <>
				<Code className='text-neutral-400' size={256} strokeWidth={2} />
				<Typography tag='h1' className='bg-clip-text bg-gradient-to-br from-white to-neutral-500 font-semibold text-transparent'>
					Under construction.
				</Typography>
			</>}
		</div>
	</Page>;
}

function Project(props: ArrayToTuple<typeof config.projects>) {
	const [width, setWidth] = useState<number>(window.innerWidth >= 1080 ? 1080 : window.innerWidth - 100);
	const navigate = useNavigate();

	useEffect(() => {
		function onResize() {
			setWidth(window.innerWidth >= 1080 ? 1080 : window.innerWidth - 100);
		}

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, []);

	return <div className='relative flex justify-center items-center border-neutral-800 bg-neutral-900 border rounded-3xl overflow-hidden'>
		<img
			loading='eager'
			decoding='async'
			className='h-[30rem] md:h-[35rem]  select-none object-cover'
			alt={props.name}
			style={{ width }}
			src={props.thumbnail}
			onError={(event) => (event.target as HTMLImageElement).src = '/img/projects/fallback.png'}
		/>
		<div className='z-10 absolute bg-gradient-to-t from-black/80 to-black/20 w-full h-full'>
			<div className='relative flex flex-col justify-center items-center h-full'>
				<img
					loading='eager'
					decoding='async'
					className={cn('h-12 mb-4 rounded-md', props.icon.styles)}
					src={props.icon.path}
				/>
				<div className='flex flex-col justify-center items-center mb-2'>
					<Typography tag='h3' margin={false} padding={false} border={false}>
						{props.name}
					</Typography>
					<Typography tag='h5' className='font-normal text-foreground-secondary text-lg'>
						{props.type}
					</Typography>
					<Typography tag='h6' border={false} className='font-normal text-foreground-secondary/60 text-xs'>
						{props.timeFrame}
					</Typography>
				</div>
				<Button
					className='gap-2'
					size='sm'
					onClick={() => navigate('/projects/' + props.id)}
				>
					View project <ArrowRight size={12} />
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

		onSlideChange();

		carousel.api?.on('reInit', onSlideChange);
		carousel.api?.on('scroll', onSlideChange);

		return () => {
			carousel.api?.off('reInit', onSlideChange);
			carousel.api?.off('scroll', onSlideChange);
		};
	}, [carousel]);

	return <div className='flex justify-center items-center gap-2'>
		{config.projects.map((_, index) => <div
			key={index}
			className={cn('w-3 h-3 cursor-pointer rounded-full bg-neutral-800', idx === index && 'bg-white')}
			onClick={() => carousel.api?.scrollTo(index)}
		/>)}
	</div>;
}