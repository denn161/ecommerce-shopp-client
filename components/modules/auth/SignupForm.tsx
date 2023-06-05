'use client';

import { emailPattern, namePatterns } from '@/utils/formPatterns'
import cl from 'classnames'
import React, { Children, useState } from 'react'
import { FieldError, FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import InputField from '../../elements/form-elements/InputField'
import { IInputs } from '@/types/auth'
import styles from '../../screens/AuthPage/Auth.module.scss'
import { signUP } from '@/app/api/auth'
import { toast } from 'react-toastify'
import ButtonForm from '../../elements/form-elements/ButtonForm'

interface ISignupForm {
	switchForm: () => void
	mode: 'dark' | 'light'
}
const SignupForm = ({ switchForm, mode = 'dark' }: ISignupForm) => {

   const [loading,setLoading] =useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors },
		resetField
	} = useForm<IInputs>({
	   mode:'onChange'
	})
	const onSubmit: SubmitHandler<IInputs> =async (data) => {
      try {
				setLoading(true)
				const userData = await signUP({url:'/users/register',username:data.name,email:data.email,password:data.password})
			  if(userData.success){
					resetField('name')
					resetField('email')
					resetField('password')
					switchForm()
					setLoading(false)
				}
				console.log(userData)
			} catch (error) {				
				 toast.error((error as Error).message)
			}finally{
				setLoading(false)
			}	
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form} id="a-form">
			<h2
				className={cl(styles.form_title, styles.title, {
					[styles.dark_mode]: mode === 'dark',
				})}
			>
				Создать аккаунт
			</h2>
			<InputField	
			  mode={mode}
			  error={errors.name as FieldError}
				type="text"
				placeholder="Name"
				{...register('name',{required:"Введите имя",pattern:namePatterns(),minLength:{
					 value:3,
					 message:'Минимальная длина имени 3 символа'
				},maxLength:{
					  value:8,
						message:`Максимальная длина имени 8 символов`
				}})}			
			/>
		<InputField	
		     mode={mode}
			  error={errors.email as FieldError}
				type="email"
				placeholder="Email"
				{...register('email',{required:"Email обязателен",pattern:emailPattern()})}			
			/>
			 <InputField	
			  mode={mode}
			  error={errors.password as FieldError}
				type="password"
				placeholder="Password"
				{...register('password',{required:"Пароль обязателен",minLength:{
					value:6,
					message:'Минимальная длина пароля 6 символов'
				}})}			
			/>
		 <ButtonForm loading={loading}>Создать</ButtonForm>
		</form>
	)
}

export default SignupForm
