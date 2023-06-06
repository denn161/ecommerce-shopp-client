import { toast } from 'react-toastify'

import {
	addProductFx,
	deleteCardItemFx,
	updateCartItemFx,
} from '@/app/api/shopping-cart'
import {
	removeProduct,
	updateCountProduct,
	updateShoppingCart,
	updateTotalPriceProduct,
} from '@/context/shopping-card'

export const toggleCartItem = async (
	username: string,
	productId: number,
	isInCart: boolean,
	setSpinner: (arg0: boolean) => void
) => {
	try {
		setSpinner(true)
		if (isInCart) {
			await deleteCardItemFx(`/shopping-cart/one/${productId}`)
			removeProduct(productId)
			return
		}
		const data = await addProductFx({
			url: '/shopping-cart/add',
			username,
			productId,
		})
		updateShoppingCart(data)
	} catch (error) {
		toast.error((error as Error).message)
	} finally {
		setSpinner(false)
	}
}

export const removeItemFromCart = async (
	partId: number,
	setLoading: (arg: boolean) => void
) => {
	try {
		setLoading(true)
		await deleteCardItemFx(`/shopping-cart/one/${partId}`)
		removeProduct(partId)
	} catch (error) {
		toast.error((error as Error).message)
	} finally {
		setLoading(false)
	}
}

export const updateTotalPriceCartItem = async (
	totalPrice: number,
	partId: number
) => {
	try {
		const data = await updateCartItemFx({
			url: `/shopping-cart/total-price/${partId}`,
			payload: {
				totalPrice,
			},
		})

		updateTotalPriceProduct({ partId, totalPrice: data.totalPrice })
	} catch (error) {
		toast.error((error as Error).message)
	}
}

export const updateCountCartItem = async (count: number, partId: number) => {
	try {
		const data = await updateCartItemFx({
			url: `/shopping-cart/count/${partId}`,
			payload: {
				count,
			},
		})
		updateCountProduct({ partId, count: data.count })
	} catch (error) {
		toast.error((error as Error).message)
	}
}
