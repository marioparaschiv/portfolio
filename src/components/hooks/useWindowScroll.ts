import { useEffect, useState } from 'react';

function useWindowScroll() {
	const [scroll, setScroll] = useState({ x: window.scrollX, y: window.scrollY });

	useEffect(() => {
		const onScroll = () => setScroll({ x: window.scrollX, y: window.scrollY });

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return scroll;
}

export default useWindowScroll;