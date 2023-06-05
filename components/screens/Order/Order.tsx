import { checkPaymentFx, makePaymentFx } from '@/app/api/payment'
import {v4 as uuidv4} from 'uuid'
import { deleteCardItemFx } from '@/app/api/shopping-cart'
import Spinner from '@/components/elements/spinner/Spinner'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { $mode } from '@/context/mode'
import { $shoppingCard, $totalPrice, setShoppingCard } from '@/context/shopping-card'
import { $user, $userCity } from '@/context/user'
import { formatPrice } from '@/utils/common'
import cl from 'classnames'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import styles from './Order.module.scss'

interface IOrderProps {}

export const Order = ({}: IOrderProps) => {
	const [orderIsReady, setOrderIsReady] = useState(false)
	const [agreement,setAgreement] =useState(false)
    const mode = useStore($mode) 
		const  userCity = useStore($userCity)
		 console.log(userCity)
		const user = useStore($user)
    const cards = useStore($shoppingCard)
		const totalPrice = useStore($totalPrice)
		const spinner = useStore(makePaymentFx.pending)
		 const countProductInCart = cards.reduce((acc,item)=>acc+item.count,0) 

		 

		 const router = useRouter()

		 const handleChangeAgreement = ()=>setAgreement(!agreement)

		 const resetCart = async () => {
			sessionStorage.removeItem('paymentId')
			await deleteCardItemFx(`/shopping-cart/all/${user.userId}`)
			setShoppingCard([])
		}		 

		 const makePay =async()=>{
			   try {
					   const data =await makePaymentFx({
							url:'/payment',
							amount:totalPrice,
							description:`Заказ поступил ${userCity.city?.length&&userCity.street?.length ? `город:${userCity.city},улица:${userCity.street}`:''}`	
							
						 })
				 sessionStorage.setItem('paymentId',data.id)
			   router.push(data.confirmation.confirmation_url)	
		
				 } catch (error) {
					  toast.error((error as Error).message)
				 }
		 }

		 const checkPayment = async (paymentId:string)=>{
            try {
							 const data = await checkPaymentFx({
								url:'/payment/info',
								paymentId
							 })		
						if (data.status === 'succeeded') {
							 console.log('success',data)
								resetCart()
								return
							}

						sessionStorage.removeItem('paymentId')
						} catch (error) {
							 console.log((error as Error).message) 
                 resetCart()
							
						}
		}

		 useEffect(() => {
			 const paymentId =sessionStorage.getItem('paymentId')			
			  if(paymentId){
				checkPayment(paymentId)
				}		 
		 }, [])
		 

	return <section className={cl(styles.order)}>
		      <div className="container">         
					 <h2 className={cl(styles.order__title,{
						[styles.dark]:mode==='dark'
					 })}>Орфмление заказа</h2>
					 <div className={cl(styles.order__inner,{
						[styles.dark]:mode==='dark'
					 })}>
					 <div className={cl(styles.order__cart,{
						[styles.dark]:mode==='dark'
					 })}>
						 <OrderAccordion setOrderIsReady={setOrderIsReady} showDoneIcon={orderIsReady} />
						 </div>
						 <div className={cl(styles.order__pay)}>
						 <h3 className={cl(styles.order__pay_title,{
							[styles.dark]:mode==='dark'
						 })}>
						     Итого 
							</h3>
							<div className={cl(styles.order__pay_inner,{
								[styles.dark]:mode==='dark'
							})}>
							<div className={cl(styles.order__pay_item,{
								[styles.dark]:mode==='dark'
							}								
								)}>
						       <span>Товары({countProductInCart})</span>
									 <span>{formatPrice(totalPrice)}</span>
								 </div>
								 <div className={cl(styles.order__pay_item,{
									[styles.dark]:mode==='dark'
								 })}>
						       <span>Итого</span>
									 <span>{formatPrice(totalPrice)}</span>
								 </div>
								  <button
									 onClick={makePay}
									disabled={!(agreement&&orderIsReady)} className={cl(styles.order__pay_btn,{
										[styles.dark]:mode==='dark'
									})}>
										{spinner?(<Spinner/>):(<span>Оформить заказ</span>)}
									</button>
									<label
                className={cl(styles.order__pay_rights,{
									[styles.dark]:mode==='dark'
								})}
              >
                <input
                  className={styles.order__pay_rights_input}
                  type="checkbox"    
									checked={agreement} 
									onChange={handleChangeAgreement}             
                />
                <span className={cl(styles.order__pay__rights_text,{
									[styles.dark]:mode==='dark'
								})}>
                  <strong>Согласен с условиями</strong> Правил пользования
                  торговой площадкой и правилами возврата
                </span>
              </label>
							</div>
						 </div>
					 </div>
					 </div>  
	</section>
}
