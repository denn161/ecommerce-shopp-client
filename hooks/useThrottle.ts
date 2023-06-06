import { useCallback, useRef } from 'react'

export const useThrottle = (cb: (args?: Array<any>) => void, delay: number) => {
	const isThrottled = useRef<boolean | null>(null)

	const throttledCallback = useCallback(
		(...args: any[]) => {
			if (isThrottled.current) {
				return
			}
			cb(args)
			isThrottled.current = true
			setTimeout(() => {
				isThrottled.current = false
			}, delay)
		},
		[cb, delay]
	)

	return throttledCallback
}
