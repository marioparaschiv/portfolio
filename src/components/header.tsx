import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '~/components/sheet';
import ThemeSwitcher from '~/components/theme-switcher';
import { useNavigate } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
import Button from '~/components/button';
import { useState } from 'react';
import { cn } from '~/utils';

function Header(props: React.HTMLProps<HTMLElement>) {
	const [sidebar, setSidebar] = useState(false);
	const navigate = useNavigate();

	return <nav {...props} key='header' className={cn('sticky h-18 flex px-[20px] py-[10px] items-center gap-[10px] border-b text-card-foreground shadow-sm bg-background z-10', props.className)}>
		<div className='container flex h-14 items-center gap-[10px] p-0'>
			<NavigationMenu className='w-full hidden sm:flex md:items-center md:w-auto'>
				<NavigationMenuList>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink href='/' className='font-semibold bg-transparent' onClick={e => (e.preventDefault(), navigate('/'))}>
							Home
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className='ml-auto flex flex-row gap-3 items-center flex-shrink-0 flex-grow-0'>
				<ThemeSwitcher />
				<Sheet open={sidebar} onOpenChange={setSidebar}>
					<SheetTrigger className='sm:hidden flex'>
						<Button variant='outline' size='icon'>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							{/* <SheetTitle>

</SheetTitle> */}
							<SheetDescription>
								<div onClick={() => navigate('/')} className={`flex items-center h-full text-lg w-full hover:bg-secondary transition-colors p-2 rounded-md gap-5 select-none cursor-pointer ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>
									<Home size={32} />
									Home
								</div>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	</nav>;
}

export default Header;