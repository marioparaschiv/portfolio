import { useState, useRef, useEffect, type ElementRef } from 'react';
import { animated, easings, useSpring } from '@react-spring/web';
import Technologies from '~/components/technologies';
import { useBreakpoint } from '~/components/hooks';
import Typography from '~/components/typography';
import { useNavigate } from 'react-router-dom';
import { Page } from '~/components/layout';
import { ChevronDown } from 'lucide-react';
import Button from '~/components/button';
import * as Icons from 'lucide-react';
import Card from '~/components/card';
import config from '@config.json';
import { cn } from '~/utils';
import { cva } from 'cva';
import React from 'react';

export const path = '/about';
export const element = React.memo(About);

export const showInHeader = true;
export const headerOrder = 2;

function About() {
	const navigate = useNavigate();

	return <Page section='About' className='flex justify-center items-center p-0 w-screen min-h-screen overflow-clip'>
		<div className='slide-in-from-bottom-8 flex flex-col items-center gap-8 m-auto zoom-in-105 pt-20 md:pt-0 w-full md:w-auto animate-in duration-500 fade-in-0'>
			<Typography tag='h1' className='bg-clip-text bg-gradient-to-br from-white to-neutral-500 font-semibold short:text-3xl text-transparent'>
				About me.
			</Typography>
			<div className='gap-2 md:gap-6 grid grid-cols-1 md:grid-cols-2 m-4 sm:m-0 p-4 w-full md:w-auto h-auto'>
				<Item
					highlights='red'
					title='Information'
					icon={<Icons.PersonStanding />}
				>
					{config.about.information.join('\n')}
				</Item>
				<Item
					highlights='blue'
					title='Journey'
					icon={<Icons.MapPinIcon />}
				>
					{config.about.journey.join('\n')}
				</Item>
				<Item
					highlights='green'
					title='Work'
					icon={<Icons.Briefcase />}
				>
					<span className='mb-5'>{config.about.work.join('\n')}</span>
					<Button
						className='mt-auto w-full'
						variant='secondary'
						size='sm'
						onClick={() => navigate('/contact')}
					>
						Get in Contact
					</Button>
				</Item>
				<Item
					highlights='purple'
					title='Technologies'
					icon={<Icons.Code2 />}
				>
					<Technologies identifierProps={{ className: 'short:text-xs' }} className='short:gap-y-1.5' />
				</Item>
			</div>
		</div>
	</Page>;
}

const styles = {
	icon: cva({
		base: 'flex items-center justify-center p-1 bg-neutral-500/20 border border-neutral-300/50 rounded-full transition-all w-6 h-6',
		variants: {
			highlights: {
				red: 'group-hover/card:border-rose-500/50 group-hover/card:bg-rose-400/20 group-hover/card:text-rose-500',
				green: 'group-hover/card:border-green-500/50 group-hover/card:bg-green-400/20 group-hover/card:text-green-500',
				blue: 'group-hover/card:border-blue-500/50 group-hover/card:bg-blue-400/20 group-hover/card:text-blue-500',
				purple: 'group-hover/card:border-purple-500/50 group-hover/card:bg-purple-400/20 group-hover/card:text-purple-500',
				white: 'group-hover/card:border-neutral-500/50 group-hover/card:bg-neutral-400/20 group-hover/card:text-neutral-500'
			}
		},
		defaultVariants: {
			highlights: 'purple'
		}
	})
};

type ItemProps = React.ComponentProps<typeof Card> & {
	title: string;
	icon: React.ReactNode;
};

const Item = React.memo(({ title, icon, children, ...props }: ItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<ElementRef<'div'>>(null);
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
		className='w-auto lg:w-[500px] overflow-hidden'
		onClick={() => !isMedium && setIsOpen(!isOpen)}
	>
		<div className='flex flex-col p-2 md:p-4 w-full h-full truncate'>
			<div className='flex justify-between items-center w-full'>
				<div className='flex items-center gap-4 w-full'>
					<div className={styles.icon({ highlights: props.highlights })}>
						{icon}
					</div>
					<Typography tag='h6' colour='white'>
						{title}
					</Typography>
				</div>
				<div className='flex md:hidden text-white'>
					<ChevronDown className={cn('transition-transform', isOpen && 'rotate-180')} />
				</div>
			</div>
			<animated.div className='w-full h-full' style={{ ...(!isMedium ? collapsed : {}) }}>
				<div ref={ref} className='pt-4 text-sm short:text-xs flex flex-col w-full h-full whitespace-pre-wrap'>
					{children}
				</div>
			</animated.div>
		</div>
	</Card>;
});