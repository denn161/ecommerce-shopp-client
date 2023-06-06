import { createEffect } from 'effector-next'

import instance from '../axiosClient'

import { IShoppingCard } from '@/types/shopping-card'

interface IAddCart {
	username: string
	productId: number
	url: string
}

type IUpdateProduct = {
	totalPrice?: number
	count?: number
}

interface IUpdateCartItemFx {
	url: string
	payload: {
		totalPrice?: number
		count?: number
	}
}

export const getCartItems = createEffect(async (url: string) => {
	const { data } = await instance.get<IShoppingCard[]>(url)

	return data
})

export const addProductFx = createEffect(
	async ({ url, username, productId }: IAddCart) => {
		const { data } = await instance.post<IShoppingCard>(url, {
			username,
			productId,
		})

		return data
	}
)

export const deleteCardItemFx = createEffect(async (url: string) => {
	await instance.delete(url)
})

export const updateCartItemFx = createEffect(
	async ({ url, payload }: IUpdateCartItemFx) => {
		const { data } = await instance.put<IUpdateProduct>(url, payload)

		return data
	}
)
