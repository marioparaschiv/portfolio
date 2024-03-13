import { ChevronDown, Code2, MapPin, PersonStanding, Award } from 'lucide-react';
import Information from '~/../information/about.json';
import { useBreakpoint } from '~/components/hooks';
import Typography from '~/components/typography';
import { useState, type SVGProps } from 'react';
import { TechnologiesOrder } from '~/constants';
import * as Icons from '~/components/icons';
import { Page } from '~/components/layout';
import Card from '~/components/card';
import { cn } from '~/utils';
import { cva } from 'cva';

export const path = '/about';
export const element = About;
export const order = 2;

function About() {
	return <Page section='About' className='p-0 flex min-h-screen w-screen items-center justify-center overflow-clip'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 w-full md:w-auto pt-20 md:pt-0'>
			<Typography tag='h1' className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent font-semibold'>
				About me.
			</Typography>
			<div className='m-4 grid grid-cols-1 gap-2 sm:m-0 md:grid-cols-2 p-4 md:gap-6 w-full md:w-auto'>
				<Item
					highlights='red'
					title='Information'
					icon={<PersonStanding />}
					body={<span className='whitespace-pre-wrap'>{Information.Information.text.join('\n')}</span>}
				/>
				<Item
					highlights='blue'
					title='My Journey'
					icon={<MapPin />}
					body={<span className='whitespace-pre-wrap'>{Information.Journey.text.join('\n')}</span>}
				/>
				<Item
					highlights='green'
					title='Technologies'
					icon={<Code2 />}
					body={<span className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4 mt-1'>
						{Information.Technologies.sort((a, b) => TechnologiesOrder.indexOf(a.type) - TechnologiesOrder.indexOf(b.type)).map(technology => {
							const Icon = Icons[technology.icon as keyof typeof Icons] as React.ComponentType<SVGProps<SVGSVGElement>>;

							return <div className='flex items-center gap-3' key={technology.name}>
								{Icon && <Icon className='text-neutral-200' width={18} height={18} />}
								<span className='truncate'>
									{technology.name}
								</span>
							</div>;
						})}
					</span>}
				/>
				<Item
					highlights='purple'
					title='My Proficiency'
					icon={<Award />}
					body={<span className='whitespace-pre-wrap'>{Information.Proficiency.text.join('\n')}</span>}
				/>
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

function Item({ title, icon, body, ...props }: React.ComponentProps<typeof Card> & { title: string, body: string | React.ReactNode; icon: React.ReactNode; }) {
	const [isOpen, setIsOpen] = useState(false);
	const isMedium = useBreakpoint('md');

	return <Card
		{...props}
		className='lg:w-[500px] w-auto lg:min-h-[325px] overflow-hidden'
		onClick={() => setIsOpen(!isOpen)}
	>
		<div className='flex w-full flex-col truncate p-2 md:p-4'>
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

			{(isOpen || isMedium) && <div style={{ overflow: 'hidden' }}>
				<div className='whitespace-normal truncate text-sm pt-4'>
					{body}
				</div>
			</div>}
		</div>
	</Card>;
}