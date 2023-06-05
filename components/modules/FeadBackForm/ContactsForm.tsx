import emails from '@emailjs/browser'
import cl from 'classnames'
import { useStore } from 'effector-react'
import { MutableRefObject, useRef, useState } from 'react'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import styles from './ContactsForm.module.scss'
import ButtonForm from '@/components/elements/form-elements/ButtonForm'
import InputFeadBack from '@/components/elements/form-elements/InputFeadBack'
import InputField from '@/components/elements/form-elements/InputField'
import MessageInput from '@/components/elements/form-elements/MessageInput'
import { $mode } from '@/context/mode'
import { TFeadBackInputs } from '@/types/feadback-form'
import { emailPattern, namePatterns, phonePattern } from '@/utils/formPatterns'

const ContactsForm = () => {
	const [loading, setLoading] = useState(false)
	const mode = useStore($mode)
	const formRef = useRef() as MutableRefObject<HTMLFormElement>

	const {
		handleSubmit,
		register,
		resetField,
		formState: { errors },
	} = useForm<TFeadBackInputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<TFeadBackInputs> = () => {
		setLoading(true)
		emails
			.sendForm(
				'service_uy483b3',
				'template_b7zd65g',
				formRef.current,
				'45jA5dMFdyKWXK6Dq'
			)
			.then((res) => {
				setLoading(false)
				toast.success('Сообщение отправлено')
			})
			.catch((error) => {
				setLoading(false)
				toast.error(`Что-то пошло нет так ${error.text}`)
			})

			formRef.current.reset()
	}
	return (
		<div
			className={cl(styles.contacts__form, {
				[styles.dark]: mode === 'dark',
			})}
		>
			<h3
				className={cl(styles.contacts__form_title, {
					[styles.dark]: mode === 'dark',
				})}
			>
				Форма обратной связи
			</h3>
			<form
				ref={formRef}
				onSubmit={handleSubmit(onSubmit)}
				className={cl(styles.contacts__form_inner, {
					[styles.dark]: mode === 'dark',
				})}
			>
				<InputFeadBack
					mode={mode}
					error={errors.name as FieldError}
					type="text"
					label="Имя*"
					placeholder="Имя"
					{...register('name', {
						required: 'Введите имя',
						pattern: namePatterns(),
						minLength: {
							value: 3,
							message: 'Минимальная длина имени 3 символа',
						},
						maxLength: {
							value: 8,
							message: `Максимальная длина имени 8 символов`,
						},
					})}
				/>
				<InputFeadBack
					mode={mode}
					error={errors.phone as FieldError}
					type="text"
					label="Телефон*"
					placeholder="+7(999)9999916"
					{...register('phone', {
						required: 'Введите телефон',
						pattern: phonePattern(),
						minLength: {
							value: 11,
							message: 'Формат телефона должен быть +7 999 999 99 99',
						},
						maxLength: {
							value: 11,
							message: 'Формат телефона должен быть +7 999 999 99 99',
						},
					})}
				/>
				<InputFeadBack
					mode={mode}
					error={errors.email as FieldError}
					type="email"
					label="Email*"
					placeholder="info@mail.ru"
					{...register('email', {
						required: 'Email обязателен',
						pattern: emailPattern(),
					})}
				/>
				<MessageInput
					mode={mode}
					{...register('message', {
						required: 'Введите ваше сообщение',
						minLength: {
							value: 20,
							message: 'Минимальное количество символов 20 ',
						},
						maxLength: {
							value: 300,
							message: 'Максимальное количество символов 300',
						},
					})}
					error={errors.message as FieldError}
					placeholder="Введите сообщение(от 20 до 300 символов)"
				/>
				<div className={cl(styles.contacts__form_border)}></div>
				<ButtonForm
					mode={mode}
					isContacts
					className={cl(styles.contacts__form_btn, {
						[styles.dark]: mode === 'dark',
					})}
					loading={loading}
					type={'submit'}
				>
					Отрпавить сообщение
				</ButtonForm>
			</form>
		</div>
	)
}

export default ContactsForm
