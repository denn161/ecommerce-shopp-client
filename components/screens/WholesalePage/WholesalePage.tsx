import HeadTitle from '@/components/elements/head/HeadTitle'
import ContactsForm from '@/components/modules/FeadBackForm/ContactsForm'
import { $mode } from '@/context/mode'
import cl from 'classnames'
import { useStore } from 'effector-react'

import styles from './WholesalePage.module.scss'


interface IWholesalePageProps {}

export const WholesalePage = ({}: IWholesalePageProps) => {

     const mode =useStore($mode) 

	return <section className={cl(styles.wholesale,{
		[styles.dark]:mode==='dark'
	})}>
		 <div className="container">
			 <HeadTitle classNames={cl(styles.wholesale__title,{
				[styles.dark]:mode==='dark'
			 })} title='Оптовым покупателям'/>
			 <div className={styles.wholesale__inner}>
				 <div className={cl(styles.wholesale__info,{
					[styles.dark]:mode==='dark'
				 })}>
					 <p>Условия оптовых заказов решаются индивидуально по телефону: <a href='tel:+7 (555) 55-55-555'>+7 (555) 55-55-555</a></p>
					 <p>Либо опишите суть заказа в форме обртной связи и мы с вами свяжемся.</p>
				 </div>
				 <div className={styles.wholesale__form}>
					 <ContactsForm/>
				 </div>
			 </div>
		 </div>
	</section>
}
