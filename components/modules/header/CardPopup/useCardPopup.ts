import { getCartItems } from '@/app/api/shopping-cart'
import { $mode } from '@/context/mode'
import { $shoppingCard, $totalPrice, setShoppingCard, setTotalPrice } from '@/context/shopping-card'
import { $user } from '@/context/user'
import { useStore } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const useCardPopup = () => {

  	const [loading,setLoading] =useState(false) 
    
	  const user = useStore($user)

		const mode = useStore($mode)

		const cards = useStore($shoppingCard)
   
		const totalPrice = useStore($totalPrice)
		

   	const loadCardItems = useCallback(async()=>{
           try {
						setLoading(true)

						const data = await getCartItems(`/shopping-cart/${user.userId}`) 

						setShoppingCard(data)
						
					 } catch (error) {
						 const err = error as Error 
						 toast.error(err.message)
						
					 }finally{
						setLoading(false)
					 }
	},[])	   

	useEffect(()=>{
    loadCardItems()
	},[]) 

	useEffect(() => {
		setTotalPrice(cards.reduce((acc, item) => acc + item.total_price, 0))
	}, [cards])

	return{loading,cards,mode,totalPrice}
}

export default useCardPopup