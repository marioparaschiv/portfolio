import { useBreakpoint } from '~/components/hooks';
import * as Icons from '~/components/icons';
import type { SVGProps } from 'react';
import { cn } from '~/utils';

interface Technology {
	name: string;
	icon: string;
	type: string;
}

interface TechnologiesProps extends React.HTMLProps<HTMLSpanElement> {
	technologies: Technology[];
	order?: string[];
}

function Technologies(props: TechnologiesProps) {
	const { order, technologies } = props;
	const isMedium = useBreakpoint('md');
	if (!technologies || !Array.isArray(technologies)) return null;

	const items = order ? technologies.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type)) : technologies;

	return <span {...props} className={cn('grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4', props.className)}>
		{items.map((technology) => {
			const Icon = Icons[technology.icon as keyof typeof Icons] as React.ComponentType<SVGProps<SVGSVGElement>>;

			return <div className='flex items-center gap-3' key={technology.name}>
				{Icon && <Icon
					className='text-neutral-200 shrink-0'
					width={isMedium ? 18 : 14}
					height={isMedium ? 18 : 14}
				/>}
				<span className='truncate text-xs md:text-sm'>
					{technology.name}
				</span>
			</div>;
		})}
		{/* {details.items.map((item: AboutItemGridItem) => {
			const Icon = (Icons[item.icon as keyof typeof Icons] ?? ItemIcons[item.icon as keyof typeof ItemIcons]) as React.ComponentType<SVGProps<SVGSVGElement>>;

			const TYPE_OPACITY = {
				language: 'opacity-100',
				database: 'opacity-75',
				framework: 'opacity-50',
				tooling: 'opacity-50',
			};

			return <div className='flex items-center gap-3' key={item.name}>
				{Icon && <Icon className={cn('text-neutral-200 shrink-0', item.type && TYPE_OPACITY[item.type])} width={isMedium ? 18 : 14} height={isMedium ? 18 : 14} />}
				<span className='truncate text-xs md:text-sm'>
					{item.name}
				</span>
			</div>;
		})} */}
	</span>;
}

export default Technologies;