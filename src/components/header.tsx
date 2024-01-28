import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Pages from '~/pages';
import { cn } from '~/utils';
import React from 'react';

function Header(props: React.HTMLProps<HTMLElement>) {
	const navigate = useNavigate();
	const location = useLocation();

	console.log('updated');

	/* <LazyMotion key='nav' features={domAnimation}>
		<m.nav
			animate='animate'
			transition={{ duration: 0.5, delay: 0 }}
			exit='exit'
			initial='initial'
			variants={{
				initial: {
					opacity: 0,
					y: -30,
				},
				animate: {
					opacity: 1,
					y: 0,
				},
				exit: {
					opacity: 0,
					y: -30,
				},
			}}
			className={cn('transition-color fixed z-10 flex w-full items-center justify-center gap-8 border-0 border-b border-b-white/10 bg-white/1 py-7 backdrop-blur-md sm:border-b-white/0 sm:bg-white/0 sm:py-9 sm:backdrop-blur-0', props.className)}
			{...props as any}
		> */

	return <nav
		key='header'
		className={cn('transition-color fixed z-10 flex w-full items-center justify-center gap-8 border-0 border-b border-b-white/10 bg-white/1 py-7 backdrop-blur-md sm:border-b-white/0 sm:bg-white/0 sm:py-9 sm:backdrop-blur-0', props.className)}
		{...props as any}
	>
		<div className='container flex items-center gap-4 justify-center'>
			<NavigationMenu className='w-full flex md:items-center md:w-auto'>
				<NavigationMenuList>
					{Object.entries(Pages).sort(([, first], [, second]) => first.order - second.order).map(([name, instance]) =>
						<NavigationMenuItem>
							<NavigationMenuLink href={instance.path} className={cn('text-md cursor-pointer select-none transition-colors duration-200 font-semibold', location.pathname === instance.path && '!to-neutral-100')} onClick={e => (e.preventDefault(), navigate(instance.path))}>
								{name}
							</NavigationMenuLink>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	</nav>;
	/* </m.nav>
</LazyMotion>; */
}

export default Header;