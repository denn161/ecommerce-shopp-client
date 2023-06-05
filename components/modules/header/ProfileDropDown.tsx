import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useCallback } from 'react'

import styles from './Header.module.scss'
import LogoutSvg from './svg/LogoutSvg'
import ProfileSvg from './svg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IComponentProfile } from '@/types/common'
import { witchClickAutside } from '@/utils/witchClickOutside'
import { $user } from '@/context/user'
import { useRouter } from 'next/router'
import { logout } from '@/app/api/auth'

const ProfileDropDown = forwardRef<HTMLDivElement, IComponentProfile>(
	({ open, setOpen }, ref) => {
		const mode = useStore($mode)
    const user = useStore($user)
		const toggleProfileDropDown = () => setOpen(!open) 

		const router = useRouter() 

		const handleLogout = useCallback(async()=>{
          await logout('/users/logout')
					router.push('/')
		},[router])

		return (
			<div className={cl(styles.profile, {
				[styles.dark_mode]: mode === 'dark',
			})} ref={ref}>
				<button
					onClick={toggleProfileDropDown}
					className={cl(styles.profile__btn)}
				>
					<ProfileSvg />
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							style={{ transformOrigin: 'right-top' }}
							className={cl(styles.profile__menu, {
								[styles.dark_mode]: mode === 'dark',
							})}
						>
							<li className={styles.profile__user}>
								<span>{user.username}</span>
								<span>{user.email}</span>
							</li>
							<li className={styles.profile__logout}>
								<button onClick={handleLogout} className={cl(styles.profile__logout_btn,{
									[styles.dark_mode]:mode==='dark'
								})}>
									<span className={styles.profile__logout_btn_text}>Выйти</span>
									<span className={styles.profile__logout_btn_svg}>
										<LogoutSvg />
									</span>
								</button>
							</li>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		)
	}
)
ProfileDropDown.displayName = 'ProfileDropDown'
export default witchClickAutside(ProfileDropDown)
