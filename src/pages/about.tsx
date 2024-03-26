import { useState, useRef, useEffect, type SVGProps } from 'react';
import { animated, easings, useSpring } from '@react-spring/web';
import Information from '~/../information/about.json';
import { useBreakpoint } from '~/components/hooks';
import Typography from '~/components/typography';
import * as ItemIcons from '~/components/icons';
import { useNavigate } from 'react-router-dom';
import { Page } from '~/components/layout';
import { ChevronDown } from 'lucide-react';
import Button from '~/components/button';
import * as Icons from 'lucide-react';
import Card from '~/components/card';
import { cn } from '~/utils';
import { cva } from 'cva';
import React from 'react';

export const path = '/about';
export const element = About;

export const header = true;
export const order = 2;

function About() {
	const isMedium = useBreakpoint('md');
	const navigate = useNavigate();

	return <Page section='About' className='p-0 flex min-h-screen w-screen items-center justify-center overflow-clip'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 w-full md:w-auto pt-20 md:pt-0'>
			<Typography tag='h1' className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent font-semibold'>
				About me.
			</Typography>
			<div className='m-4 grid grid-cols-1 gap-2 sm:m-0 md:grid-cols-2 p-4 md:gap-6 w-full h-full md:w-auto'>
				{(Object.entries(Information) as unknown as [string, AboutItemDetails][]).map((card) => {
					const [section, details] = card;
					const Icon = Icons[details.icon as keyof typeof Icons] as React.ComponentType<SVGProps<SVGSVGElement>>;

					return <Item
						key={section}
						highlights={details.highlights as 'red' | 'blue' | 'green' | 'purple' | 'white'}
						title={section}
						icon={<Icon />}
						body={
							<>
								{details.items ? <span className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4'>
									{details.items.map((item: AboutItemGridItem) => {
										const Icon = (Icons[item.icon as keyof typeof Icons] ?? ItemIcons[item.icon as keyof typeof ItemIcons]) as React.ComponentType<SVGProps<SVGSVGElement>>;

										return <div className='flex items-center gap-3' key={item.name}>
											{Icon && <Icon className='text-neutral-200 shrink-0' width={isMedium ? 18 : 14} height={isMedium ? 18 : 14} />}
											<span className='truncate text-xs md:text-sm'>
												{item.name}
											</span>
										</div>;
									})}
								</span> : details.text && <span className='whitespace-pre-wrap'>
									{details.text.join('\n')}
								</span>}
								{details.buttons?.length && <div className='mt-5'>
									{details.buttons?.map(btn => <Button
										className='w-full'
										variant='secondary'
										size='sm'
										onClick={() => {
											if (!btn.onClick) return;

											if (btn.onClick.type === 'redirect' && btn.onClick.url) {
												navigate(btn.onClick.url);
											}
										}}
									>
										{btn.text}
									</Button>)}
								</div>}
							</>}
					/>;
				})}
			</div>
		</div>
	</Page>;
}

const styles = {
	icon: cva({
		base: 'flex items-center justify-center p-1 bg-neutral-500/20 border border-neutral-300/50 rounded-full transition-all w-6 h-6',
		variants: {
			highlights: {
				red: 'group-hover:border-rose-500/50 group-hover:bg-rose-400/20 group-hover:text-rose-500',
				green: 'group-hover:border-green-500/50 group-hover:bg-green-400/20 group-hover:text-green-500',
				blue: 'group-hover:border-blue-500/50 group-hover:bg-blue-400/20 group-hover:text-blue-500',
				purple: 'group-hover:border-purple-500/50 group-hover:bg-purple-400/20 group-hover:text-purple-500',
				white: 'group-hover:border-neutral-500/50 group-hover:bg-neutral-400/20 group-hover:text-neutral-500'
			}
		},
		defaultVariants: {
			highlights: 'purple'
		}
	})
};

const Item = React.memo(({ title, icon, body, ...props }: React.ComponentProps<typeof Card> & { title: string, body: string | React.ReactNode; icon: React.ReactNode; }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);
	const isMedium = useBreakpoint('md');

	const collapsed = useSpring({
		opacity: isOpen || isMedium ? 1 : 0,
		maxHeight: `${isOpen || isMedium ? height : 0}px`,
		transform: `scale(${isOpen || isMedium ? 1 : 0.90})`,
		config: (event) => {
			switch (event) {
				case 'opacity':
					return {
						easing: easings.easeInOutQuad,
						duration: 425,
					};
				case 'maxHeight':
				case 'transform':
					return {
						easing: easings.easeInOutQuad,
						duration: 400,
					};
			}

			return {
				easing: easings.easeInOutQuad,
				duration: 425,
			};
		}
	});

	useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.scrollHeight);
		}
	}, [ref]);

	return <Card
		{...props}
		className='lg:w-[500px] w-auto overflow-hidden'
		onClick={() => !isMedium && setIsOpen(!isOpen)}
	>
		<div className='flex w-full h-full flex-col truncate p-2 md:p-4'>
			<div className='flex w-full items-center justify-between'>
				<div className='flex w-full items-center gap-4'>
					<div className={styles.icon({ highlights: props.highlights })}>
						{icon}
					</div>
					<Typography tag='h6' colour='white'>
						{title}
					</Typography>
				</div>
				<div className='flex text-white md:hidden'>
					<ChevronDown className={cn('transition-transform', isOpen && 'rotate-180')} />
				</div>
			</div>
			<animated.div className='w-full h-full' style={{ overflow: 'hidden', ...(!isMedium ? collapsed : {}) }}>
				<div ref={ref} className='w-full h-full whitespace-normal truncate text-sm pt-4'>
					{body}
				</div>
			</animated.div>
		</div>
	</Card>;
});