import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Pages from '~/pages';
import { cn } from '~/utils';
import React from 'react';

function Header(props: React.HTMLProps<HTMLElement>) {
	const navigate = useNavigate();
	const location = useLocation();

	return <nav
		{...props as any}
		key='header'
		className={cn('pointer-events-none transition-color fixed z-10 flex w-full items-center justify-center gap-8 border-0 border-b border-b-white/10 bg-white/1 py-7 backdrop-blur-md sm:border-b-white/0 sm:bg-white/0 sm:py-9 sm:backdrop-blur-0', props.className)}
	>
		<div className='flex justify-center items-center gap-4 pointer-events-none container'>
			<NavigationMenu className='flex md:items-center w-full md:w-auto pointer-events-auto'>
				<NavigationMenuList>
					{Object.entries(Pages).sort(([, first], [, second]) => first.headerOrder - second.headerOrder).filter(([, instance]) => instance.showInHeader).map(([name, instance]) =>
						<NavigationMenuItem key={name}>
							<NavigationMenuLink href={instance.path} className={cn('text-md cursor-pointer select-none transition-colors duration-200 font-semibold', (location.pathname === instance.path || (instance.path !== '/' && location.pathname.startsWith(instance.path))) && '!to-neutral-100')} onClick={e => (e.preventDefault(), navigate(instance.path))}>
								{name}
							</NavigationMenuLink>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	</nav>;
}

export default Header;