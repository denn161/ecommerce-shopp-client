import { useCallback, useEffect, useRef, useState } from 'react'

import { useThrottle } from './useThrottle'
import { getWindowWidth } from '@/utils/common'

const useWindowWidth = (maxWidth: number) => {
	const [windowW, setWindowWidth] = useState(getWindowWidth())
	const [isMedia, setIsMedia] = useState(false)

	const callback = useCallback(() => {
		setWindowWidth(getWindowWidth())
	}, [])
	const handleResize = useThrottle(callback, 300)
	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (windowW.windowWidth <= maxWidth) {
			setIsMedia(true)
		} else {
			setIsMedia(false)
		}
	}, [windowW, maxWidth])

	return { isMedia }
}

export default useWindowWidth
