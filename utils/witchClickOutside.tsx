import {
	ForwardRefExoticComponent,
	MutableRefObject,
	RefAttributes,
	useEffect,
	useRef,
	useState,
} from 'react'

import { IComponentProfile } from '@/types/common'

export function witchClickAutside(
	WrappedComponent: ForwardRefExoticComponent<
		IComponentProfile & RefAttributes<HTMLDivElement>
	>
) {
	const Component = () => {
		const [open, setOpen] = useState(false)

		const ref = useRef() as MutableRefObject<HTMLDivElement>

		useEffect(() => {
			const handleClick = (e: MouseEvent) => {
				if (!ref.current.contains(e.target as HTMLDivElement)) {
					setOpen(false)
				}
			}

			document.addEventListener('mousedown', handleClick)

			return () => document.removeEventListener('mousedown', handleClick)
		}, [ref])

		return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
	}

	return Component
}
