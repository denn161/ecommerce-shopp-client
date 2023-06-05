
import cl from 'classnames'

import { tabsText } from './data'
import { motion } from 'framer-motion'

import styles from './ShippingPage.module.scss'
import { useShippingPage } from './useShippingPage'

interface IShippingPageProps {}

export const ShippingPage = ({}: IShippingPageProps) => {

	 const {mode,isTabs,tabs} =useShippingPage()

	return <section className={cl(styles.shipping)}>
    <div className="container">
      <h2 className={cl(styles.shipping__title,{
				[styles.dark]:mode==='dark'
			})}>Доставка и оплата</h2>

			<div className={cl(styles.shipping__tabs,{
				[styles.dark]:mode==='dark'
			})}>
        <ul className={cl(styles.shipping__tabs_list,{
				[styles.dark]:mode==='dark'
			})}>	
          {tabs.map((item,i)=>
           <li key={item.id} className={cl(styles.shipping__item,{
            [styles.active]:isTabs[i],
            [styles.dark]:mode==='dark'
           })}>
             <button
              className={cl(styles.shipping__btn,{              
                [styles.dark]:mode==='dark'
               })}
             onClick={()=>item.onClick()}>{item.title}</button>
           </li>
          )}		   
				</ul>
         <div className={cl(styles.shipping__tabs_content,{
          [styles.dark]:mode==='dark'
         })}>
         {tabsText.map((item,i)=>{
           if(isTabs[i]){
         return  <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         key={i}
         className={cl(styles.shipping__tabs_content_text,{
          [styles.dark]:mode==='dark'
         })}
         >
          {item}
         </motion.div>         
             
              }             
           }           
        )}
         </div>
			</div>
		</div>

	</section>
}
