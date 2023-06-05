import { ICheckedFilterItem } from '@/types/catalog'
import cl from 'classnames'
import styles from './CatalogFilters.module.scss'
import CheckedFilterItem from './CheckedFilterItem'
import {setBoilersManufacturers } from '@/context/boiler-parts'
import { Event } from 'effector'

interface ICheckedFilterList{
	items:ICheckedFilterItem[]
	mode:string,
	setManufacturer:Event<ICheckedFilterItem[]>
  updateManufacturer:Event<ICheckedFilterItem>
	
}
const CheckedFiltersList = ({items,mode,setManufacturer,updateManufacturer}:ICheckedFilterList) => {
  
	const checkAllManufacturers =()=>setManufacturer(items.map((item)=>({...item,checked:true})))

	return (
		<>
		  <button className={cl(styles.filters__btn,{
			   [styles.dark]:mode==='dark'
			})} onClick={checkAllManufacturers}>Выбрать все</button>
		 <ul className={cl(styles.filters__list,{
      [styles.dark]:mode==='dark'
		})}>		
      {items.map((item)=>
			<CheckedFilterItem  event={updateManufacturer}   key={item.id} mode={mode} item={item} />
			)}
		</ul>
		<div style={{height:24}}></div>
		</>
	)
}

export default CheckedFiltersList