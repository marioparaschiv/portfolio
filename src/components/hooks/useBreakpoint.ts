import resolveConfig from 'tailwindcss/resolveConfig';
import { useMediaQuery } from 'react-responsive';
import Tailwind from '../../../tailwind.config';

const Config = resolveConfig(Tailwind);
const breakpoints = Config.theme!.screens!;

function useBreakpoint(breakpoint: keyof typeof breakpoints) {
	const bool = useMediaQuery({ query: `(min-width: ${breakpoints[breakpoint]})` });

	return bool;
}

export default useBreakpoint;