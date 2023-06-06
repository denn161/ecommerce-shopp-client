'use client'

import cl from 'classnames'
import { useStore } from 'effector-react'

import { useSwitch } from '../useSwitch'

import styles from './Auth.module.scss'
import SwitchTheme from '@/components/elements/switch-theme/SwitchTheme'
import SigninForm from '@/components/modules/auth/SigninForm'
import SignupForm from '@/components/modules/auth/SignupForm'
import { $mode } from '@/context/mode'
import useWindowWidth from '@/hooks/useMediaQuery'

const AuthPage = () => {
	const mode = useStore($mode)
	const {
		refs: {
			switchC1,
			switchC2,
			switchCircle1,
			switchCircle2,
			switchCtn,
			aContainer,
			bContainer,
		},
		action: { switchForm },
	} = useSwitch()

	const { isMedia } = useWindowWidth(800)

	return (
		<div
			className={cl(styles.main, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			<div className={styles.mode_toggle}>
				<SwitchTheme />
			</div>
			<div
				ref={aContainer}
				className={cl(styles.container, styles.a_container, {
					[styles.dark_mode]: mode === 'dark',
				})}
				id="a-container"
			>
				<div className={cl(styles.container__inner)}>
					<SignupForm mode={mode} switchForm={switchForm} />
				</div>
			</div>
			<div
				ref={bContainer}
				className={cl(styles.container, styles.b_container, {
					[styles.dark_mode]: mode === 'dark',
				})}
				id="b-container"
			>
				<div
					className={cl(styles.container__inner, {
						[styles.dark_mode]: mode === 'dark',
					})}
				>
					<SigninForm mode={mode} />
				</div>
			</div>
			<div
				ref={switchCtn}
				className={cl(styles.switch, {
					[styles.dark_mode]: mode === 'dark',
				})}
				id="switch-cnt"
			>
				<div
					ref={switchCircle1}
					className={cl(styles.switch__circle, {
						[styles.dark_mode]: mode === 'dark',
					})}
				></div>
				<div
					ref={switchCircle2}
					className={cl(styles.switch__circle, styles.switch__circle__t, {
						[styles.dark_mode]: mode === 'dark',
					})}
				></div>
				<div ref={switchC1} className={styles.switch__container} id="switch-c1">
					{!isMedia && (
						<>
							<h2
								className={cl(styles.switch__title, styles.title, {
									[styles.dark_mode]: mode === 'dark',
								})}
							>
								Добро пожаловать!
							</h2>
							<p
								className={cl(styles.description, {
									[styles.dark_mode]: mode === 'dark',
								})}
							>
								Чтобы оставаться на связи с нами, пожалуйста, войдите под своей
								личной информацией
							</p>
						</>
					)}
					<button
						onClick={switchForm}
						className={cl(
							styles.form__button,
							styles.button,
							styles.switch__btn,
							{
								[styles.dark_mode]: mode === 'dark',
							}
						)}
					>
						SIGN IN
					</button>
				</div>
				<div
					ref={switchC2}
					className={cl(styles.switch__container, styles.is_hidden)}
					id="switch-c2"
				>
					{!isMedia && (
						<>
							<h2
								className={cl(styles.switch__title, styles.title, {
									[styles.dark_mode]: mode === 'dark',
								})}
							>
								Привет друг !
							</h2>
							<p
								className={cl(styles.description, {
									[styles.dark_mode]: mode === 'dark',
								})}
							>
								Введите свои личные данные и начните путешествие с нами
							</p>
						</>
					)}
					<button
						onClick={switchForm}
						className={cl(
							styles.form__button,
							styles.button,
							styles.switch__btn,
							{
								[styles.dark_mode]: mode === 'dark',
							}
						)}
					>
						SIGN UP
					</button>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
