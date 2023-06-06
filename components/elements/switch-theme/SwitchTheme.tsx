import { useStore } from 'effector-react'
import React, { useEffect } from 'react'

import styles from './SwitchTheme.module.scss'
import { $mode } from '@/context/mode'
import useTheme from '@/hooks/useTeheme'

const SwitchTheme = () => {
	const { toggleTheme } = useTheme()

	const mode = useStore($mode)

	const handleToggle = () => {
		toggleTheme()
		document.body.classList.toggle('dark_mode')
	}

	useEffect(() => {
		document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
	}, [mode])

	return (
		<div className={styles.theme}>
			<input
				checked={mode === 'light'}
				onChange={handleToggle}
				className={styles.theme__input}
				type={'checkbox'}
			/>
		</div>
	)
}

export default SwitchTheme
