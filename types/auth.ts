import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IInputs {
	name: string
	email: string
	password: string
}

export interface IFieldINput {
	placeholder: string
	error: FieldError | undefined
	mode?: 'dark' | 'light'
	label?: string
}
export type TInputPropsField = InputHTMLAttributes<HTMLInputElement> &
	IFieldINput

export type TTextaAreaProps = InputHTMLAttributes<HTMLTextAreaElement> &
	IFieldINput

export interface IUser {
	username: string
	userId: number | string
	email: string
}
