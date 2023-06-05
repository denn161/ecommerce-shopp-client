import { updateCountCartItem } from '@/utils/shopping-cart'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'



import styles from './Counter.module.scss'
import cl from 'classnames'
import MinusSvg from './svg/MinusSvg'
import PlusSvg from './svg/PlusSvg'


interface ICounter {
	totalCount: number
	partId: number
	initialCount: number
	incrementPrice: VoidFunction
	decrementPrice: VoidFunction
	mode: string
}

const Counter = ({ mode,totalCount,initialCount,partId,incrementPrice,decrementPrice }: ICounter) => {
	const [spinner, setSpinner] = useState(false)
	const [count,setCounter] =useState(initialCount)
	const [disableIncrease,setDisableIncrease]=useState(false) 
	const [disableDecrease,setDisableDecrease]=useState(false)

   

	useEffect(()=>{
     if(count===1){
			 setDisableDecrease(true)
		 }

		 if(count===totalCount){
			   setDisableIncrease(true)
		 }

	},[count,totalCount])

	 
   const increase = async ()=>{
		   try {
				 setSpinner(true)
         incrementPrice()
				 setDisableDecrease(false)
				 setCounter(count+1) 
			   await updateCountCartItem(count+1,partId)
			 } catch (error) {
				 toast.error((error as Error).message)
			 }finally{
				setSpinner(false)
			 }
	 }
	 const decrease = async ()=>{
		try {
			setSpinner(true)
      decrementPrice() 
			setDisableIncrease(false) 
			setCounter(count-1) 
		  await updateCountCartItem(count-1,partId)
		} catch (error) {
			toast.error((error as Error).message)
		}finally{
		 setSpinner(false)
		}
}
	return (
		<div className={cl(styles.counter,{
			[styles.dark]:mode==='dark'
		})}>
			<button 
			 className={cl(styles.counter__minus,{
				[styles.dark]:mode==='dark'
			 })}
			 disabled={disableDecrease}
			 onClick={decrease}
			>
				<MinusSvg />
			</button>
			<span>{initialCount}</span>
			<button
			  disabled={disableIncrease}
				className={cl(styles.counter__plus,{
					[styles.dark]:mode==='dark'
				 })}
				onClick={increase}
			>
				
				<PlusSvg />
			</button>
		</div>
	)
}

export default Counter
