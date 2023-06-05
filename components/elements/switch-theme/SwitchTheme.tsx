import React, { useEffect } from 'react'
import styles from './SwitchTheme.module.scss'
import useTheme from '@/hooks/useTeheme'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

const SwitchTheme = () => {

const {toggleTheme} =useTheme()

const mode = useStore($mode)

const handleToggle = ()=>{
	 toggleTheme()
	 document.body.classList.toggle('dark_mode')
}

useEffect(()=>{
   document.body.classList.add(mode==='dark'?'dark_mode':'body')


},[mode])

	return (
		<div  className={styles.theme}>
     <input checked={mode==='light'} onChange={handleToggle} className={styles.theme__input} type={'checkbox'}/>
		</div>
	)
}

export default SwitchTheme