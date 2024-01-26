import { useMousePosition } from '~/components/hooks';
import { useEffect, useMemo, useRef } from 'react';
import * as Constants from '~/constants';

function Cursor() {
	const ref = useRef<HTMLDivElement>(null);
	const mouse = useMousePosition();
	const scale = useMemo(() => {
		const tag = mouse.target?.tagName?.toLowerCase();
		const classes = mouse.target?.classList;
		const id = mouse.target?.id;

		if (
			(tag && Constants.Clickables.elements.includes(tag)) ||
			(classes && Constants.Clickables.classes.some(cls => classes?.contains(cls))) ||
			(id && Constants.Clickables.ids.includes(id))
		) {
			return 1.8;
		}

		return 1.2;
	}, [mouse]);

	useEffect(() => {
		const x = (mouse?.x ?? 0) - ref.current!.offsetWidth / 2;
		const y = (mouse?.y ?? 0) - ref.current!.offsetHeight / 2;

		ref.current!.animate({
			transform: `translate(${x}px, ${y}px) scale(${scale})`
		}, {
			duration: 500,
			fill: 'forwards'
		});
	}, [mouse, scale, ref.current]);

	return <div
		ref={ref}
		className='cursor-follower hidden lg:block mix-blend-difference rounded-[20px] bg-cursor w-[40px] h-[40px] fixed left-0 top-0 z-[999999999] pointer-events-none opacity-0 transition-opacity duration-500'
	/>;
}

export default Cursor;