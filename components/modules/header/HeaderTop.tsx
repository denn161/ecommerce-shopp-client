'use client'

import cl from 'classnames'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProfileDropDown from './ProfileDropDown'
import { dataLinks } from './data'
import CityButton from '@/components/elements/city-button/CityButton'
import SwitchTheme from '@/components/elements/switch-theme/SwitchTheme'
import { $mode } from '@/context/mode'
import useWindowWidth from '@/hooks/useMediaQuery'
import { usePopup } from '@/hooks/usePopup'
import styles from './Header.module.scss'
import BurgerSvg from '@/components/elements/burger-button/svg/BurgerSvg'
import './burger.scss'

const HeaderTop = () => {
	const { open,handleToggleOpen,btnRef,closePopup } = usePopup()
	
	const { pathname } = useRouter()
	const mode = useStore($mode)
	const ismediaQuery = useWindowWidth(950)
	return (
		<div className={styles.header__top}>
			<div className={cl('container', styles.header__top_container)}>
				{!ismediaQuery.isMedia && <CityButton />}
				{ismediaQuery.isMedia && (
						<button ref={btnRef} onClick={handleToggleOpen}  className='menu'>
						<BurgerSvg/>
			 </button>
				)}
				<nav
					className={cl(styles.header__nav, {
						[styles.open]: open,
						[styles.dark_mode]:mode==='dark'
					})}
				>
					<ul className={styles.header__nav_list}>
						{dataLinks.map((link) => (
							<li
								key={link.path}
								className={cl(styles.header__nav_list_item, {
									[styles.active]:link.path === pathname,
								})}
							>
								<Link href={link.path} className={cl(styles.header__nav_link,{
									[styles.dark_mode]:mode==='dark'
								})} onClick={closePopup}>
									{link.label}
								</Link>
							</li>
						))}
						{ismediaQuery.isMedia && (
							<li className={styles.header__nav_list_item}>
								<CityButton />
							</li>
						)}
						{ismediaQuery.isMedia && (
							<li className={styles.header__nav__ist_item}>
								<SwitchTheme />
							</li>
						)}
					</ul>
				</nav>
				{!ismediaQuery.isMedia && <SwitchTheme />}
				<ProfileDropDown />
			</div>
		</div>
	)
}

export default HeaderTop
