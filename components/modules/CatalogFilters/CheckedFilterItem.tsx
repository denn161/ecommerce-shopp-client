import { ICheckedFilterItem } from '@/types/catalog'
import styles from './CatalogFilters.module.scss'
import cl from 'classnames'
import { Event } from 'effector'
import { ChangeEvent, useCallback } from 'react'


interface ICheckBoxItem{
	 item:ICheckedFilterItem
	 mode:string 	  
	 event:Event<ICheckedFilterItem> 
}

const CheckedFilterItem = ({item:{id,title,checked},mode,event}:ICheckBoxItem) => {    

	const handleChangeFilter=()=>event({checked:!checked,id} as ICheckedFilterItem)

	return (
	 <li className={styles.filters__list_item}>
			<label  htmlFor={id}>
			<input
			 id={id}  
			 value={title}
			 checked={checked} 
			 onChange={handleChangeFilter}
			 type={'checkbox'}/>
			 <span className={cl(styles.filters__item_title,{
				[styles.dark]:mode==='dark'
			 })}>{title}</span>
		</label>
	 </li>
	)
}

export default CheckedFilterItem