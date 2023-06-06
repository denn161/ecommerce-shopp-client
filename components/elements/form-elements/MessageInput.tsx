'use client'

import cl from 'classnames'
import { forwardRef } from 'react'

import styles from '../../modules/FeadBackForm/ContactsForm.module.scss'

import { TInputPropsField, TTextaAreaProps } from '@/types/auth'

const MessageInput = forwardRef<HTMLTextAreaElement, TTextaAreaProps>(
	({ error, placeholder, mode, label, type = 'text', style, ...rest }, ref) => {
		return (
			<div style={style} className={cl(styles.contacts__form_block)}>
				<label
					className={cl(styles.contacts__label, {
						[styles.dark]: mode === 'dark',
					})}
				>
					<textarea
						className={cl(styles.contacts__form_message, {
							[styles.dark]: mode === 'dark',
						})}
						ref={ref}
						placeholder={placeholder}
						{...rest}
					/>
				</label>
				{error && <div className={styles.error_alert}>{error.message}</div>}
			</div>
		)
	}
)

MessageInput.displayName = 'InputField'
export default MessageInput
