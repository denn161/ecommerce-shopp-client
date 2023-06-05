import { IBoilerPart } from '@/types/boiler-parts'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'
import React from 'react'
import styles from './ProductCard.module.scss'
import cl from 'classnames'
interface IProductCard{
	 item:IBoilerPart 
	 style:{} 
	 goTo?:boolean
	 mode:string

}
const ProductCard = ({item,style,goTo,mode}:IProductCard) => {
	return (
		<div className={cl(styles.product,{
			[styles.dark_mode]:mode==='dark'
		})} style={style}> 
	   <div className={styles.product__image}>
		 <img src={JSON.parse(item.images)[1]} alt="ProductImg" />
		 </div>
		<div className={styles.product__content}>
		<Link href={goTo?`/catalog/${item.id}`:'/catalog'}>
		<h3 className={cl(styles.product__name,{
			[styles.dark_mode]:mode==='dark'
		})}>{item.name}</h3>
		</Link>
		 <div className={cl(styles.product__code,{
			[styles.dark_mode]:mode==='dark'
		 })}>
			<div>Артикул:</div>
			 <div>{item.vendor_code}</div>
			</div>
		</div>
		 <div className={cl(styles.product__price,{
				[styles.dark_mode]:mode==='dark'
		 })}>
			 {formatPrice(item.price)}Р
			</div> 
	 </div>
	)
}

export default ProductCard