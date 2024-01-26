import React from 'react';

function useMousePosition(onMove?: (event: MouseEvent) => void) {
	const [
		position,
		setMousePosition
	] = React.useState<{
		x: number | null,
		y: number | null;
		target: Element | null;
	}>({ x: null, y: null, target: null });

	React.useEffect(() => {
		function updateMousePosition(event: MouseEvent) {
			try {
				onMove?.(event);
			} catch (error) {
				console.error('[Hooks] [useMousePosition] Failed to fire callback.', error);
			}

			setMousePosition({
				x: event.clientX,
				y: event.clientY,
				target: event.target as Element
			});
		};

		window.addEventListener('mousemove', updateMousePosition);

		return () => window.removeEventListener('mousemove', updateMousePosition);
	}, []);

	return position;
};

export default useMousePosition;