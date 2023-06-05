import { $mode } from '@/context/mode'
import { ICheckedFilterItem } from '@/types/catalog'
import { Event } from 'effector'
import { useStore } from 'effector-react'
import cl from 'classnames'
import styles from '../CatalogFilters.module.scss'
import CatalogFiltersTop from './CatalogFiltersTop'
import CheckedFiltersList from '../CheckedFiltersList'
import FilterActions from '../FilterActions'

interface IFiltersPopup{	 
	 resetAll:VoidFunction
	 isDisabled:boolean
	 handleClosePopup:()=>void
	 updateManufacturers:Event<ICheckedFilterItem> 
	 setManufacturers:Event<ICheckedFilterItem[]>
	 applyFilters:()=>void 
	 openPopup:boolean
	 title:string |false
	 manufacturersList:ICheckedFilterItem[]
	 spinner:boolean
}
const FiltersPopup = ({
	resetAll,
	isDisabled,
	handleClosePopup,
	updateManufacturers,
	setManufacturers,
	applyFilters,
	openPopup,
	title,
	manufacturersList,
	spinner
}:IFiltersPopup) => {
    
	const mode = useStore($mode)

	return (
		<div className={cl(styles.filters__popup,{
			[styles.open]:openPopup,
			[styles.dark]:mode==='dark'
		})}>
       <CatalogFiltersTop
			  isDisabled={isDisabled} 
				closePopup={handleClosePopup}
				resetFilters={resetAll} 
				mode={mode}
			  btnText={'Сбросить'}  title={title}/>
        <div className={cl(styles.filters__popup_list,{
					[styles.dark]:mode==='dark'
				})}>
				<CheckedFiltersList items={manufacturersList} setManufacturer={setManufacturers} updateManufacturer={updateManufacturers} mode={mode}/>
				</div>
			 <FilterActions handleClosePopup={handleClosePopup} btnText={'Назад'} isDisabled={isDisabled} isResetBtn mode={mode} applyFilters={applyFilters} resetFilters={resetAll} spinner={spinner}/>
		</div>
	)
}

export default FiltersPopup