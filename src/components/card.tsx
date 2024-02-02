import { LazyMotion, domAnimation, m, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cva, type VariantProps } from 'cva';
import { cn } from '~/utils';
import React from 'react';

type CardProps = React.HTMLProps<HTMLDivElement> & VariantProps<typeof styles.highlights> & { radius?: 'sm' | 'md' | 'lg'; };

const styles = {
	container: cva({
		base: 'group relative flex rounded-2xl hover:shadow-md hover:shadow-black/5 bg-neutral-900/75 hover:scale-[1.03] duration-200 transition-all ease-out p-6 text-neutral-400',
		variants: {
			highlights: {
				white: 'group-hover:border-white/50 group-hover:bg-white/20 selection:bg-neutral-400/50',
				red: 'group-hover:border-rose-500/50 group-hover:bg-rose-400/20 selection:bg-rose-500/50',
				blue: 'group-hover:border-blue-500/50 group-hover:bg-blue-400/20 selection:bg-blue-500/50',
				green: 'group-hover:border-green-100/50 group-hover:bg-green-400/20 selection:bg-green-500/50',
				purple: 'group-hover:border-purple-500/50 group-hover:bg-purple-400/20 selection:bg-purple-500/50',
			},
		}
	}),
	highlights: cva({
		base: 'absolute inset-0 rounded-2xl opacity-0 transition ease-linear duration-200 saturate-200',
		variants: {
			highlights: {
				white: 'bg-neutral-700/50 group-hover:opacity-100',
				red: 'bg-gradient-to-tr from-rose-500/30 to-pink-700/30 group-hover:opacity-30',
				blue: 'bg-gradient-to-tr from-blue-500/30 to-indigo-700/30 group-hover:opacity-30',
				green: 'bg-gradient-to-tr from-green-500/30 to-emerald-700/30 group-hover:opacity-30',
				purple: 'bg-gradient-to-tr from-purple-500/30 to-violet-700/30 group-hover:opacity-30',
			}
		},
		defaultVariants: {
			highlights: 'purple'
		}
	})
};

function Card({ children, highlights, radius = 'lg', className, onMouseMove, ...props }: CardProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const maskImage = useMotionTemplate`radial-gradient(${radius === 'lg' ? '250px' : radius === 'md' ? '180px' : '100px'} at ${mouseX}px ${mouseY}px, white, transparent)`;

	return <div
		{...props}
		className={cn(styles.container({ highlights }), className)}
		onMouseMove={({ currentTarget, clientX, clientY, ...rest }) => {
			const rect = currentTarget.getBoundingClientRect();

			mouseX.set(clientX - rect.left);
			mouseY.set(clientY - rect.top);

			if (typeof onMouseMove === 'function') {
				onMouseMove({ currentTarget, clientX, clientY, ...rest });
			}
		}}
	>
		<LazyMotion features={domAnimation}>
			<m.div className={styles.highlights({ highlights })} style={{ maskImage, WebkitMaskImage: maskImage }} />
		</LazyMotion>
		<div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all group-hover:ring-white/20' />
		<div className='relative h-full w-full'>
			{children}
		</div>
	</div>;
}

export default Card;