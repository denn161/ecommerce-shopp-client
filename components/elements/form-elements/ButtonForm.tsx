import cl from 'classnames'
import { ReactNode } from 'react'

import styles from '../../screens/AuthPage/Auth.module.scss'

interface IButtonForm {
	loading: boolean
	children: ReactNode
	type?: 'submit' | 'button' | 'reset' | undefined
	className?: string
	mode?: 'dark' | 'light'
	isContacts?: boolean
}

const ButtonForm = ({
	children,
	loading,
	mode = 'dark',
	type = 'submit',
	className,
	isContacts,
}: IButtonForm) => {
	const modeClass = mode === 'dark' ? 'text-light' : 'text-dark'

	return (
		<button
			type={type}
			className={cl(styles.form__button, styles.button, styles.submit, {
				[styles.contacts]: isContacts,
			})}
		>
			{loading ? (
				<div className={`spinner-border ${modeClass}`} role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				children
			)}
		</button>
	)
}

export default ButtonForm
