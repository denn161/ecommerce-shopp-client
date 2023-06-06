import { useStore } from 'effector-react'
import { useEffect } from 'react'

import { $mode, setMode } from '@/context/mode'

const useTheme = () => {
	const mode = useStore($mode)

	const toggleTheme = () => {
		if (mode === 'dark') {
			localStorage.setItem('theme', JSON.stringify('light'))
			setMode('light')
		} else {
			localStorage.setItem('theme', JSON.stringify('dark'))
			setMode('dark')
		}
	}

	useEffect(() => {
		const theme = JSON.parse(localStorage.getItem('theme') as string)

		if (theme) {
			setMode(theme)
		}
	}, [])

	return { toggleTheme }
}

export default useTheme
