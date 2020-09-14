import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useIsVisible = (): [boolean, MutableRefObject<HTMLElement>] => {
	const [visible, setVisibility] = useState(false);
	const trigger: MutableRefObject<HTMLElement> = useRef(null);
	useEffect(() => {
		const onScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight;
			if (topPosition < scrollPosition) {
				setVisibility(true);
			}
		};
		const cleanup = () => window.removeEventListener('scroll', onScroll);
		const topPosition =
			(trigger &&
				trigger.current &&
				trigger.current.getBoundingClientRect().bottom -
					trigger.current.getBoundingClientRect().height / 4) ||
			0;
		onScroll();

		window.addEventListener('scroll', onScroll);
		return cleanup;
	}, []);
	return [visible, trigger];
};
