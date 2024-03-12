'use client';

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useCallback, useRef } from 'react';
import * as React from 'react';

import { cn } from '~/utils';
import Button from '~/components/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: 'horizontal' | 'vertical';
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}

const TWEEN_FACTOR_BASE = 0.2;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = 'horizontal',
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === 'horizontal' ? 'x' : 'y',
			},
			plugins
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);

		const tweenFactor = useRef(0);

		const tweenOpacity = useCallback(
			(emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
				const engine = emblaApi.internalEngine();
				const scrollProgress = emblaApi.scrollProgress();
				const slidesInView = emblaApi.slidesInView();
				const isScrollEvent = eventName === 'scroll';

				emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
					let diffToTarget = scrollSnap - scrollProgress;
					const slidesInSnap = engine.slideRegistry[snapIndex];

					slidesInSnap.forEach((slideIndex) => {
						if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

						if (engine.options.loop) {
							engine.slideLooper.loopPoints.forEach((loopItem) => {
								const target = loopItem.target();

								if (slideIndex === loopItem.index && target !== 0) {
									const sign = Math.sign(target);

									if (sign === -1) {
										diffToTarget = scrollSnap - (1 + scrollProgress);
									}
									if (sign === 1) {
										diffToTarget = scrollSnap + (1 - scrollProgress);
									}
								}
							});
						}

						const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
						const opacity = numberWithinRange(tweenValue, 0.6, 1).toString();
						const scale = numberWithinRange(tweenValue, 0.85, 1).toString();

						const nodes = emblaApi.slideNodes();
						const node = nodes[slideIndex];

						node.style.opacity = opacity;
						node.style.transform = `scale(${scale})`;
					});
				});
			},
			[]
		);

		const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
			tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
		}, []);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);


		React.useEffect(() => {
			function onKeyDown(event: KeyboardEvent) {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === 'ArrowRight') {
					event.preventDefault();
					scrollNext();
				}
			}

			document.addEventListener('keydown', onKeyDown);

			return () => document.removeEventListener('keydown', onKeyDown);
		}, [scrollPrev, scrollNext]);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) return;

			setTweenFactor(api);
			tweenOpacity(api);
			api
				.on('reInit', setTweenFactor)
				.on('reInit', tweenOpacity)
				.on('scroll', tweenOpacity);
		}, [api, tweenOpacity]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			api.on('reInit', onSelect);
			api.on('select', onSelect);

			return () => {
				api?.off('select', onSelect);
			};
		}, [api, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
				}}
			>
				<div
					ref={ref}
					className={cn('relative', className)}
					role='region'
					aria-roledescription='carousel'
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	}
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className='overflow-hidden'>
			<div
				ref={ref}
				className={cn(
					'flex',
					orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
					className
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();

	return (
		<div
			ref={ref}
			role='group'
			aria-roledescription='slide'
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-1/2',
				orientation === 'horizontal' ? 'pl-4' : 'pt-4',
				className
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute  h-8 w-8 rounded-full',
				orientation === 'horizontal'
					? '-left-12 top-1/2 -translate-y-1/2'
					: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeftIcon className='h-4 w-4' />
			<span className='sr-only'>Previous slide</span>
		</Button>
	);
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute h-8 w-8 rounded-full',
				orientation === 'horizontal'
					? '-right-12 top-1/2 -translate-y-1/2'
					: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRightIcon className='h-4 w-4' />
			<span className='sr-only'>Next slide</span>
		</Button>
	);
});
CarouselNext.displayName = 'CarouselNext';

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
};
