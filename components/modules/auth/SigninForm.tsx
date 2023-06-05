 'use client';

import {namePatterns } from '@/utils/formPatterns'
import cl from 'classnames'
import React, { useState } from 'react'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'

import InputField from '../../elements/form-elements/InputField'
import { IInputs } from '@/types/auth'
import styles from '../../screens/AuthPage/Auth.module.scss'
import { singIn } from '@/app/api/auth'
import ButtonForm from '../../elements/form-elements/ButtonForm'
import { showAuthError } from '@/utils/error'
import { useRouter } from 'next/navigation'

interface ISignupForm {	
	mode: 'dark' | 'light'
}
const SigninForm = ({mode = 'dark' }: ISignupForm) => {
	const [loading,setLoading] =useState(false)

  const router = useRouter()

	const {
		handleSubmit,
		register,
		resetField,
		formState: { errors },
	} = useForm<Omit<IInputs,'email'>>({
	   mode:'onChange'
	})
	const onSubmit: SubmitHandler<Omit<IInputs,'email'>> =async (data) => {
		 console.log(data)
		try {
			setLoading(true)
			const userData = await singIn({url:'/users/login',username:data.name,password:data.password})
			resetField('name')		
			resetField('password')		
		  router.push('/dashboard')
			setLoading(false)
		} catch (error) {
			  showAuthError(error)
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
			 Войти в аккаунт
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
			  error={errors.password as FieldError}
				type="password"
				placeholder="Password"
				{...register('password',{required:"Пароль обязателен",minLength:{
					value:6,
					message:'Минимальная длина пароля 6 символов'
				}})}			
			/>
		 <ButtonForm loading={loading}>Войти</ButtonForm>
		</form>
	)
}

export default SigninForm
