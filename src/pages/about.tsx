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

export const header = true;
export const order = 2;

function About() {
	const navigate = useNavigate();

	return <Page section='About' className='p-0 flex min-h-screen w-screen items-center justify-center overflow-clip'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 w-full md:w-auto pt-20 md:pt-0'>
			<Typography tag='h1' className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent font-semibold'>
				About me.
			</Typography>
			<div className='m-4 grid grid-cols-1 gap-2 sm:m-0 md:grid-cols-2 p-4 md:gap-6 w-full h-auto md:w-auto'>
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
					{config.about.work.join('\n')}
					<Button
						className='w-full mt-5'
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
					<Technologies />
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
			<animated.div style={{ overflow: 'hidden', ...(!isMedium ? collapsed : {}) }}>
				<div ref={ref} className='whitespace-pre-wrap text-sm pt-4'>
					{children}
				</div>
			</animated.div>
		</div>
	</Card>;
});