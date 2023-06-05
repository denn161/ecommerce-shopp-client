
import { getNewBoilerPartsFx } from '@/app/api/boiler-parts'
import { $shoppingCard, $totalPrice } from '@/context/shopping-card'
import { IBoilerPart } from '@/types/boiler-parts'
import { IShoppingCard } from '@/types/shopping-card'
import { useStore } from 'effector-react'
import {useCallback, useEffect, useState} from 'react'
export const useDashboard = ()=>{

	const shoppingCart = useStore($shoppingCard)

	const [newParts,setNewParts] =useState<IBoilerPart[]>([]) 
	const [bestsellers,setBestsellers]=useState<IBoilerPart[]>([])  
	const [showAlert,setShowAlert]=useState<boolean>(!!shoppingCart.length)	
	const [loading,setLoading] = useState(false) 
	   
	 const totalPrice =useStore($totalPrice)

	 const countProductInCart = shoppingCart.reduce((acc,item)=>acc+item.count,0)
  
	const handleCloseAlert = ()=>{
      setShowAlert(false)
	}


	useEffect(()=>{
    if(shoppingCart.length){
			 setShowAlert(true)
			 return
		}
		setShowAlert(false)
	},[shoppingCart.length])
	

	const getBolierParts = useCallback(async()=>{
      try {
				setLoading(true)
         const bestsellers = await getNewBoilerPartsFx('/boiler-parts/bestsellers') 
				 const newParts = await getNewBoilerPartsFx('/boiler-parts/fresh')
				 setBestsellers(bestsellers.rows)
				 setNewParts(newParts.rows)			
				 setLoading(false)	
			} catch (error) {
				 setLoading(false)
			}
			finally{
				 setLoading(false)
			}

	},[])

	useEffect(()=>{
     getBolierParts()
	},[])

	return {newParts,bestsellers,loading,showAlert,handleCloseAlert,shoppingCart,totalPrice,countProductInCart}

}