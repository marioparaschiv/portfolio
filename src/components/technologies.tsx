import { useBreakpoint } from '~/components/hooks';
import * as Icons from '~/components/icons';
import type { SVGProps } from 'react';
import config from '@config.json';
import { cn } from '~/utils';

interface TechnologiesProps extends React.HTMLProps<HTMLSpanElement> {
	technologies?: string[];
	order?: string[];
	identifierProps?: React.ComponentProps<'span'>;
}

function Technologies({ order = config.technologies.order, technologies = config.technologies.items.map(i => i.name), ...props }: TechnologiesProps) {
	const isMedium = useBreakpoint('md');

	if (!technologies || !Array.isArray(technologies)) return null;

	const entities = technologies.map(t => config.technologies.items.find(i => i.name === t)).filter(Boolean);
	const items = order ? entities.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type)) : entities;

	return <span {...props} className={cn('grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4', props.className)}>
		{items.map((technology) => {
			const Icon = Icons[technology.icon as keyof typeof Icons] as React.ComponentType<SVGProps<SVGSVGElement>>;

			return <div className='flex items-center gap-3 ' key={technology.name}>
				{Icon && <Icon
					className='text-neutral-200 shrink-0'
					width={isMedium ? 18 : 14}
					height={isMedium ? 18 : 14}
				/>}
				<span {...props.identifierProps ?? {}} className={cn('truncate text-xs md:text-sm', props.identifierProps?.className)}>
					{technology.name}
				</span>
			</div>;
		})}
	</span>;
}

export default Technologies;