import * as Dialog from '@radix-ui/react-dialog';
import { animated, useSpringValue } from '@react-spring/web';
import { ArrowUpDown } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Card from '~/components/card';

interface Image {
	src: string;
	title: string;
	subtitle: string;
}

interface MediaProps extends React.ComponentProps<typeof Dialog.Root> {
	onSelect?: (index: number) => void;
	images: Image[];
	footer?: {
		enabled?: boolean;
		hint?: boolean;
		subtitle?: string;
	};
}

function Media({ images, footer = {}, ...props }: MediaProps) {
	if (!images.length) return null;

	const [opened, setOpened] = useState(false);
	const [locked, setLocked] = useState(false);
	const [selected, setSelected] = useState(0);
	const [hovered, setHovered] = useState(0);
	const [search, setSearch] = useState('');

	const listRef = useRef<HTMLDivElement | null>(null);
	const ref = useRef<HTMLDivElement | null>(null);

	const animation = {
		left: useSpringValue(0),
		top: useSpringValue(0),
		width: useSpringValue(0),
		height: useSpringValue(0),
	};

	const uuid = useMemo(() => crypto.randomUUID(), []);
	const items = useMemo(() => {
		const result: typeof images = [];

		for (let i = 0; images.length > i; i++) {
			const image = images[i];
			const searchable = [image.title, image.subtitle];

			if (searchable.some(s => s.toLowerCase().includes(search.toLowerCase()))) {
				result.push(images[i]);
			}
		}

		return result;
	}, [search]);

	useEffect(() => {
		// Out of bounds check
		if ((items.length - 1) < hovered) {
			console.log('Corrected out of bounds index');
			setHovered(0);
		}
	}, [search, hovered]);

	const animateProperties = useCallback((target?: HTMLElement, immediate: boolean = false) => {
		if (!target) {
			console.log('no target');
			return;
		}

		const rect = target.getBoundingClientRect();

		animation.top[immediate ? 'set' : 'start'](target.offsetTop);
		animation.width[immediate ? 'set' : 'start'](rect.width);
		animation.height[immediate ? 'set' : 'start'](rect.height);
	}, []);

	const scrollToIndex = useCallback((index: number) => {
		if (!listRef.current) {
			console.log('no ref');
			return;
		}

		// Account for the highlight element
		const child = index + 1;

		listRef.current.children[child]?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	}, [listRef]);


	const changeIndex = useCallback((index: number) => {
		setHovered(index);
		scrollToIndex(index);
	}, [items]);

	useLayoutEffect(() => {
		if (!ref.current) return;
		animateProperties(ref.current);
	}, [opened, ref.current]);

	const moveDown = useCallback(() => {
		setLocked(true);
		changeIndex(hovered < (items.length - 1) ? hovered + 1 : 0);
	}, [hovered]);

	const moveUp = useCallback(() => {
		setLocked(true);
		changeIndex(hovered > 0 ? hovered - 1 : items.length - 1);
	}, [hovered]);

	useEffect(() => {
		function onResize() {
			if (!ref.current) return;

			const target = ref.current;

			if (target) {
				animateProperties(target, true);
				scrollToIndex(hovered);
			}
		}

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	useLayoutEffect(() => {
		if (opened) {
			setImmediate(() => scrollToIndex(hovered));
		}
	}, []);

	return <>
		<div className='relative flex justify-center items-center border-neutral-800 bg-neutral-900 border rounded-xl lg:rounded-3xl overflow-hidden aspect-[16/9]'>
			<img
				loading='lazy'
				decoding='async'
				alt={images[selected].title}
				src={images[selected].src}
				onError={(event) => (event.target as HTMLImageElement).src = '/img/projects/fallback.png'}
				sizes='100vw'
				className='absolute inset-0 shadow-none border-none w-full max-w-none h-full text-transparent object-cover outline-none scale-[1.02]'
			/>
		</div>
		<Dialog.Root open={opened} onOpenChange={setOpened} {...props}>
			<Dialog.Trigger asChild>
				<Card contentClassName='group flex items-center'>
					<div className='flex flex-col gap-1'>
						<span className='font-semibold text-sm text-white sm:text-base md:text-lg lg:text-xl truncate'>
							{images[selected].title}
						</span>
						<span className='text-neutral-300 text-xs md:text-sm truncate'>
							{images[selected].subtitle}
						</span>
					</div>
					<div className='group-hover:text-white ml-auto transition-colors'>
						<ArrowUpDown size={24} />
					</div>
				</Card>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-sm animate-in duration-200 fade-in' />
				<Dialog.Content
					className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2'
					onKeyDown={(event) => {
						switch (event.key) {
							case 'ArrowDown':
								event.preventDefault();
								moveDown();
								break;

							case 'ArrowUp':
								event.preventDefault();
								moveUp();
								break;
							case 'Enter':
								if (!items.length) return;

								setOpened(false);
								setSelected(hovered);
								break;
						}
					}}
				>
					<div className='border-neutral-700 bg-neutral-900 shadow-lg mx-6 sm:mx-0 border rounded-2xl'>
						<input
							type='text'
							placeholder='Search...'
							className='z-20 border-neutral-800 bg-transparent px-6 sm:px-7 py-3 sm:py-4 border-b w-full text-sm text-white placeholder:text-neutral-500 sm:text-base outline-none'
							onChange={(event) => setSearch(event.target.value)}
							value={search}
						/>
						<div
							ref={listRef}
							className='relative z-0 flex flex-col px-3 sm:px-4 py-2 sm:py-3 w-full h-full max-h-80 overflow-auto'
						>
							{/* Mover */}
							<animated.div
								style={{
									width: animation.width,
									height: animation.height,
									top: animation.top
								}}
								className='z-10 absolute bg-white/10 rounded-lg sm:rounded-xl w-full h-[87.5px]'
							/>
							{items.length === 0 && <div className='p-12 font-bold text-center'>
								No items found containing '{search.toLowerCase()}'.
							</div>}
							{items.map((image, index) => <div
								id={image.src + index}
								data-hover-uuid={uuid}
								className='relative z-10 flex items-center gap-3 p-1.5 sm:p-2 cursor-pointer'
								ref={(r) => {
									if (hovered === index) {
										ref.current = r;
									} else {
										return null;
									}
								}}
								onClick={() => {
									setOpened(false);
									setSelected(index);
								}}
								onMouseLeave={() => setLocked(false)}
								onMouseEnter={() => {
									if (!locked) {
										setHovered(index);
									}
								}}
							>
								<div className='relative bg-neutral-900 rounded-md w-24 sm:w-32 h-[54px] sm:h-[72px] overflow-hidden'>
									<img
										alt={`Media ${image.src}`}
										loading='lazy'
										decoding='async'
										onError={(event) => (event.target as HTMLImageElement).src = '/img/projects/fallback.png'}
										src={image.src}
										data-nimg='fill'
										className='shadow-none border-none max-w-none object-cover outline-none scale-[1.02]'
										style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }}>
									</img>
								</div>
								<div className='flex-1'>
									<div className='font-medium text-white text-xs sm:text-sm'>
										{image.title}
									</div>
									<div className='text-neutral-500 text-xs'>
										{image.subtitle}
									</div>
								</div>
							</div>)}
						</div>
						{(footer.enabled ?? true) && <div className='flex justify-between items-center border-neutral-800 px-6 sm:px-7 py-3 sm:py-4 border-t w-full'>
							{footer.subtitle && <div className='font-medium text-neutral-500 text-xs sm:text-sm'>
								{footer.subtitle}
							</div>}
							{(footer.hint ?? true) && <div className='flex items-center gap-2 font-medium text-white text-xs sm:text-sm'>
								View Media
								<div className='flex justify-center items-center bg-white/5 px-2 pt-1 rounded-md text-xs'>↵</div>
							</div>}
						</div>}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	</>;
}

export default Media;