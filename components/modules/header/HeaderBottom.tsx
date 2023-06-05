import cl from 'classnames'
import { useStore } from 'effector-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

import styles from './Header.module.scss'
import LogoSvg from './svg/LogoSvg'
import { $mode } from '@/context/mode'
import SearchSvg from './svg/SearchSvg'
import SearchInput from '@/components/elements/search-input/SearchInput'
import SwitchTheme from '@/components/elements/switch-theme/SwitchTheme'
import CardPopup from './CardPopup/CardPopup'
import { useRouter } from 'next/router'
import { $disabledCard, setDisabledCard } from '@/context/shopping-card'

const HeaderBottom = () => {
	const mode = useStore($mode)
	const router = useRouter()
  
	const disabledCard = useStore($disabledCard)

	useEffect(()=>{
    if(router.pathname==='/order'){
			 setDisabledCard(true)
			 return
		}	

		setDisabledCard(false)

	},[router.pathname])

	return (
		<div
			className={cl(styles.header__bottom, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			<div className={cl('container', styles.header__bottom_container)}>
				<Link href={'/dashboard'} className={cl(styles.header__bottom_logo,{
					[styles.dark_mode]:mode==='dark'
				})}>
				   <span>
					 <img src="/img/logo.svg" alt="Logo" />
					 </span>
					<span>Детали для газовых котлов</span>
				</Link>
				<div className={cl(styles.header__bottom_search)}>
				   <SearchInput/>					
				</div>
			 <div className={styles.header__bottom_cards}>			
			 <CardPopup/>
			 </div>
			</div>
		</div>
	)
}

export default HeaderBottom
