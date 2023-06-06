import { useEffect, useState } from 'react'

import { IShoppingCard } from '@/types/shopping-card'
import {
	removeItemFromCart,
	updateTotalPriceCartItem,
} from '@/utils/shopping-cart'

export const usePrice = (item: IShoppingCard) => {
	const [loading, setLoading] = useState(false)

	const [price, setPrice] = useState(item.price)

	const incrementPrice = () => setPrice(price + item.price)
	const decrementPrice = () => setPrice(price - item.price)

	const deleteProduct = () => removeItemFromCart(item.partId, setLoading)

	useEffect(() => {
		setPrice(price * item.count)
	}, [])

	useEffect(() => {
		updateTotalPriceCartItem(price, item.partId)
	}, [price])

	return {
		price,
		loading,
		incrementPrice,
		decrementPrice,
		deleteProduct,
	}
}
