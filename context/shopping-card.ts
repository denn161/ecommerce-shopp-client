import { createDomain } from 'effector-next'

import { IShoppingCard } from '@/types/shopping-card'

const shoppingCard = createDomain()

export const setShoppingCard = shoppingCard.createEvent<Array<IShoppingCard>>()
export const updateShoppingCart = shoppingCard.createEvent<IShoppingCard>()
export const removeProduct = shoppingCard.createEvent<number>()

export const updateTotalPriceProduct = shoppingCard.createEvent<{
	partId: number
	totalPrice: number | undefined
}>()
export const updateCountProduct = shoppingCard.createEvent<{
	partId: number
	count: number | undefined
}>()

export const setTotalPrice = shoppingCard.createEvent<number>()
export const setDisabledCard = shoppingCard.createEvent<boolean>()

const remove = (cartItems: IShoppingCard[], partId: number) => {
	return cartItems.filter((item) => item.partId !== partId)
}

const updateTotalPrice = (
	cartItems: IShoppingCard[],
	partId: number,
	totalPrice: number
) => {
	return cartItems.map((item) => {
		if (item.partId === partId) {
			return {
				...item,
				total_price: totalPrice,
			}
		}

		return item
	})
}

const updateCount = (
	cartItems: IShoppingCard[],
	partId: number,
	count: number
) => {
	return cartItems.map((item) => {
		if (item.partId === partId) {
			return {
				...item,
				count,
			}
		}

		return item
	})
}

//  function updateCartItems<T>(
//   cartItems:IShoppingCard[],
// 	partId:number,
// 	payload:T

//  ){
// 	  return cartItems.map((item)=>{
// 			 if(item.partId===partId){
// 				 return{
// 					...item,
// 					...payload
// 				 }
// 			 }
// 			  return item
// 		})

//  }

export const $shoppingCard = shoppingCard
	.createStore<Array<IShoppingCard>>([])
	.on(setShoppingCard, (_, shoppingCard) => shoppingCard)
	.on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
	.on(removeProduct, (state, partId) => [...remove(state, partId)])
	.on(updateTotalPriceProduct, (state, { partId, totalPrice }) => [
		...updateTotalPrice(state, partId, totalPrice as number),
	])
	.on(updateCountProduct, (state, { partId, count }) => [
		...updateCount(state, partId, count as number),
	])

export const $totalPrice = shoppingCard
	.createStore<number>(0)
	.on(setTotalPrice, (_, totalPrice) => totalPrice)

export const $disabledCard = shoppingCard
	.createStore<boolean>(false)
	.on(setDisabledCard, (_, disabled) => disabled)
