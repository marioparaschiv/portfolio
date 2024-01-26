import { twMerge } from 'tailwind-merge';
import { type CXOptions, cx } from 'cva';

function cn(...inputs: CXOptions) {
	return twMerge(cx(inputs));
}

export default cn;
