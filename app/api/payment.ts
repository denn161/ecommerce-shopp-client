import { createEffect } from 'effector'

import instance from '../axiosClient'

type TAmount = {
	value: string
	currency: string
}

type TConfirm = {
	type: string
	confirmation_url: string
}

type TRecipient = {
	account_id: string
	gateway_id: string
}

interface IMakeResponse {
	id: string
	status: string
	amount: TAmount
	description: string
	confirmation: TConfirm
	recipient: TRecipient
	test: boolean
	paid: boolean
	refundable: boolean
	metadata: Object
}

interface IMakePayFx {
	url: string
	amount: number
	description?: string
}

interface ICheckPayment {
	url: string
	paymentId: string
}

export const makePaymentFx = createEffect(
	async ({ url, amount, description }: IMakePayFx) => {
		const { data } = await instance.post<IMakeResponse>(url, {
			amount,
			description,
		})

		return data
	}
)

export const checkPaymentFx = createEffect(
	async ({ url, paymentId }: ICheckPayment) => {
		const { data } = await instance.post<IMakeResponse>(url, { paymentId })
		return data
	}
)
