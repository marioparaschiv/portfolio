import { cva, type VariantProps } from 'cva';
import React, { useState } from 'react';
import { cn } from '~/utils';

type CardProps = React.HTMLProps<HTMLDivElement> & VariantProps<typeof styles.highlights> & {
	radius?: 'sm' | 'md' | 'lg';
	contentClassName?: string | undefined;
};

const styles = {
	container: cva({
		base: 'group/card relative focus-visible:ring-none focus-visible:outline-none flex rounded-2xl hover:shadow-md hover:shadow-black/5 bg-neutral-900/75 hover:scale-[1.03] duration-200 transition-all ease-out p-6 text-neutral-400',
		variants: {
			highlights: {
				white: 'group-hover/card:border-white/50 group-hover/card:bg-white/20 selection:bg-neutral-400/50',
				red: 'group-hover/card:border-rose-500/50 group-hover/card:bg-rose-400/20 selection:bg-rose-500/50',
				blue: 'group-hover/card:border-blue-500/50 group-hover/card:bg-blue-400/20 selection:bg-blue-500/50',
				green: 'group-hover/card:border-green-100/50 group-hover/card:bg-green-400/20 selection:bg-green-500/50',
				purple: 'group-hover/card:border-purple-500/50 group-hover/card:bg-purple-400/20 selection:bg-purple-500/50',
			},
		}
	}),
	highlights: cva({
		base: 'absolute inset-0 rounded-2xl opacity-0 transition ease-linear duration-200 saturate-200',
		variants: {
			highlights: {
				white: 'bg-neutral-700/30 group-hover/card:opacity-100',
				red: 'bg-gradient-to-tr from-rose-500/30 to-pink-700/30 group-hover/card:opacity-30',
				blue: 'bg-gradient-to-tr from-blue-500/30 to-indigo-700/30 group-hover/card:opacity-30',
				green: 'bg-gradient-to-tr from-green-500/30 to-emerald-700/30 group-hover/card:opacity-30',
				purple: 'bg-gradient-to-tr from-purple-500/30 to-violet-700/30 group-hover/card:opacity-30',
			}
		},
		defaultVariants: {
			highlights: 'white'
		}
	}),
	border: cva({
		base: 'absolute focus-visible:ring-none focus-visible:outline-none inset-0 rounded-2xl ring-1 ring-inset transition-all ring-white/10',
		variants: {
			border: {
				white: 'ring-white/5 group-hover/card:ring-white/10',
				red: 'ring-red/5 group-hover/card:ring-red-200/10',
				blue: 'ring-blue/5 group-hover/card:ring-blue-200/10',
				green: 'ring-green/5 group-hover/card:ring-green-200/10',
				purple: 'ring-purple/5 group-hover/card:ring-purple-200/10'
			}
		},
		defaultVariants: {
			border: 'white'
		}
	})
};

function Card({ children, highlights, radius = 'lg', className, contentClassName, onMouseMove, ...props }: CardProps) {
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);

	const maskImage = `radial-gradient(${radius === 'lg' ? '250px' : radius === 'md' ? '180px' : '100px'} at ${mouseX}px ${mouseY}px, white, transparent)`;

	return <div
		{...props}
		className={cn(styles.container({ highlights }), className)}
		onMouseMove={({ currentTarget, clientX, clientY, ...rest }) => {
			const rect = currentTarget.getBoundingClientRect();

			setMouseX(clientX - rect.left);
			setMouseY(clientY - rect.top);

			if (typeof onMouseMove === 'function') {
				onMouseMove({ currentTarget, clientX, clientY, ...rest });
			}
		}}
	>
		<div className={styles.highlights({ highlights })} style={{ maskImage, WebkitMaskImage: maskImage }} />
		<div className={styles.border({ border: highlights })} />
		<div className={cn('relative h-full w-full', contentClassName)}>
			{children}
		</div>
	</div>;
}

export default Card;