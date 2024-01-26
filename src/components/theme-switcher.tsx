import { useTheme } from '~/components/providers/theme-provider';
import { Button, type ButtonProps } from '~/components/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '~/utils';

export default function ModeToggle(props: ButtonProps) {
	const { setTheme, _theme } = useTheme();

	return (
		<Button
			{...props}
			variant='ghost'
			size='icon'
			className={cn('flex basis-auto shrink-0 hover:bg-none!', props.className)}
			onClick={() => setTheme(_theme === 'light' ? 'dark' : 'light')}
		>
			<Sun width={20} className='rotate-0 scale-100 transition-transform delay-100 dark:-rotate-90 dark:scale-0' />
			<Moon height={20} className='absolute rotate-90 scale-0 transition-transform delay-100 dark:rotate-0 dark:scale-100' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
