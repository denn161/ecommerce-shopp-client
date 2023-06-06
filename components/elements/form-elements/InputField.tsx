'use client'

import cl from 'classnames'
import { forwardRef } from 'react'

import styles from '../../screens/AuthPage/Auth.module.scss'

import { TInputPropsField } from '@/types/auth'

const InputField = forwardRef<HTMLInputElement, TInputPropsField>(
	({ error, placeholder, mode, type = 'text', style, ...rest }, ref) => {
		return (
			<div style={style} className={cl(styles.input__block)}>
				<label
					className={cl(styles.label, {
						[styles.dark_mode]: mode === 'dark',
					})}
				>
					<span className={styles.placeholder}>{placeholder}</span>
					<input
						className={styles.form__input}
						type={type}
						autoComplete="on"
						ref={ref}
						{...rest}
					/>
				</label>
				{error && <div className={styles.error_alert}>{error.message}</div>}
			</div>
		)
	}
)

InputField.displayName = 'InputField'
export default InputField
