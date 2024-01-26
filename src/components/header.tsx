import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '~/components/theme-switcher';
import { cn } from '~/utils';

function Header(props: React.HTMLProps<HTMLElement>) {
	const navigate = useNavigate();
	const location = useLocation();

	return <nav {...props} key='header' className={cn('sticky h-18 flex py-6 px-3 2xl:px-36 3xl:px-0 items-center gap-4 bg-background z-10', props.className)}>
		<div className='container flex items-center gap-4'>
			<NavigationMenu className='w-full flex md:items-center md:w-auto'>
				<NavigationMenuList>
					<NavigationMenuItem className={cn('text-foreground-secondary cursor-pointer select-none transition-colors', (location.pathname === '/' || !location.pathname) && 'text-primary')}>
						<NavigationMenuLink href='/' className='font-bold bg-transparent text-md' onClick={e => (e.preventDefault(), navigate('/'))}>
							Home
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className={cn('text-foreground-secondary cursor-pointer select-none transition-colors', location.pathname === '/projects' && 'text-primary')}>
						<NavigationMenuLink href='/#/projects' className='font-bold bg-transparent text-md' onClick={e => (e.preventDefault(), navigate('/projects'))}>
							Projects
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className={cn('text-foreground-secondary cursor-pointer select-none transition-colors', location.pathname === '/contact' && 'text-primary')}>
						<NavigationMenuLink href='/#/contact' className='font-bold bg-transparent text-md' onClick={e => (e.preventDefault(), navigate('/contact'))}>
							Contact
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className='ml-auto flex flex-row gap-3 items-center flex-shrink-0 flex-grow-0'>
				<ThemeSwitcher />
			</div>
		</div>
	</nav>;
}

export default Header;