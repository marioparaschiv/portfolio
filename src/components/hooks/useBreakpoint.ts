import resolveConfig from 'tailwindcss/resolveConfig';
import { useMediaQuery } from 'react-responsive';
import file from '../../../tailwind.config';

const config = resolveConfig(file);
const breakpoints = config.theme!.screens!;

function useBreakpoint(breakpoint: keyof typeof breakpoints) {
	return useMediaQuery({ query: `(min-width: ${breakpoints[breakpoint]})`, });
}

export default useBreakpoint;