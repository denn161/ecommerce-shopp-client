'use client'
import cl from 'classnames'
import React, { forwardRef } from 'react'

import styles from '../../modules/FeadBackForm/ContactsForm.module.scss'

import { TInputPropsField } from '@/types/auth'

const InputFeadBack = forwardRef<HTMLInputElement, TInputPropsField>(
	({ error, placeholder,mode,label, type = 'text', style, ...rest}, ref) => {
		return (
			<div style={style} className={cl(styles.contacts__input_block)}>
				<label className={cl(styles.contacts__form_label,{
					[styles.dark]:mode==='dark'
				})}>
					<span className={styles.contacts__form_placeholder}>{label}</span>
					<input
						className={cl(styles.contacts__form_input,{
							[styles.dark]:mode==='dark'
						})}
						type={type}
						autoComplete="on"
						placeholder={placeholder}
						ref={ref}
						{...rest}
					/>
				</label>
				{error && <div className={styles.error_alert}>{error.message}</div>}
			</div>
		)
	}
)

InputFeadBack.displayName = 'InputField'
export default InputFeadBack
