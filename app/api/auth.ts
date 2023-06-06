import { AxiosError } from 'axios'
import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import instance from '../axiosClient'

import { HTTPStatus } from '@/constants'
import { IUser } from '@/types/auth'

interface ISignup {
	url: string
	username: string
	email: string
	password: string
}

interface IUserResponse {
	warningMessage: string
	user: {
		id: number
		username: string
		email: string
		password: string
		createdAt: Date
		updatedAt: Date
	}
	success?: boolean
}

export const signUP = createEffect(
	async ({ url, username, email, password }: ISignup) => {
		const { data } = await instance.post<IUserResponse>(url, {
			username,
			email,
			password,
		})

		if (data.warningMessage) {
			toast.warning(data.warningMessage)
		}

		toast.success('Вы успешно зарегестрировались!!!')
		return data
	}
)

export const singIn = createEffect(
	async ({ url, username, password }: Omit<ISignup, 'email'>) => {
		const { data } = await instance.post<IUserResponse>(url, {
			username,
			password,
		})

		toast.success('Вход выполнен!')

		return data
	}
)
export const loginCheckFx = createEffect(async (url: string) => {
	try {
		const { data } = await instance.get<IUser>(url)

		return data
	} catch (error) {
		const err = error as AxiosError
		if (err.response) {
			if (err.response.status === HTTPStatus.FORBIDDEN) {
				return false
			}
		}

		toast.error((error as Error).message)
	}
})

export const logout = createEffect(async (url: string) => {
	try {
		await instance.get(url)
		toast.success('Вы вышли из системы!')
	} catch (error) {
		toast.error((error as Error).message)
	}
})
