import { useState, useRef, useEffect, type ElementRef } from 'react';
import { animated, easings, useSpring } from '@react-spring/web';
import TechnologiesList from '~/components/technologies';
import { useBreakpoint } from '~/components/hooks';
import Typography from '~/components/typography';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
export const headerOrder = 3;

function About() {
	const navigate = useNavigate();

	return <div className='flex min-h-[calc(100dvh-5dvh)] justify-center items-center'>
		<Helmet>
			<title>About » {config.name}</title>
		</Helmet>
		<div className='relative slide-in-from-bottom-8 flex flex-col justify-center items-center gap-8 m-auto zoom-in-105 w-full md:w-auto animate-in duration-500 fade-in'>
			<Typography tag='h1' className='bg-clip-text bg-gradient-to-br from-white to-neutral-500 font-semibold text-transparent'>
				About
			</Typography>
			<div className='gap-2 md:gap-6 grid grid-cols-1 md:grid-cols-2 m-4 sm:m-0 p-4 w-full md:w-auto h-auto'>
				<Item
					highlights='red'
					title='Information'
					icon={<Icons.PersonStanding size={14} />}
				>
					{config.about.information.join('\n')}
				</Item>
				<Item
					highlights='blue'
					title='Values'
					icon={<Icons.Shield size={14} />}
				>
					{config.about.values.join('\n')}
				</Item>
				<Item
					highlights='green'
					title='Work'
					icon={<Icons.Briefcase size={14} />}
				>
					<span className='mb-5'>{config.about.work.join('\n')}</span>
					<Button
						className='mt-auto w-full flex-shrink-0'
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
					icon={<Icons.Code2 size={14} />}
				>
					<TechnologiesList technologies={config.about.technologies} className='mt-2' />
				</Item>
			</div>
		</div>
	</div>;
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
	childrenClassName?: string;
};

const Item = React.memo(({ title, icon, children, ...props }: ItemProps) => {
	const [height, setHeight] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<ElementRef<'div'>>(null);
	const isMedium = useBreakpoint('md');

	const collapsed = useSpring({
		opacity: isOpen || isMedium ? 1 : 0,
		maxHeight: height ? `${isOpen || isMedium ? height : 0}px` : undefined,
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
			setHeight(ref.current.offsetHeight);
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
			<animated.div className='w-full h-full' style={collapsed}>
				<div ref={ref} className={cn('pt-4 text-sm flex flex-col w-full h-full whitespace-pre-wrap', props.childrenClassName)}>
					{children}
				</div>
			</animated.div>
		</div>
	</Card>;
});