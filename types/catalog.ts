import { Event } from 'effector'

export interface IQueryParams {
  offset: string
  param: string
  boiler: string
  parts: string
  priceFrom: string
  priceTo: string
	partId:number|string
}

export interface ICheckedFilterItem{
  title:string 
  id?:string 
  checked:boolean  
}

interface ICatalogFilters{
  priceRange: number[]
	isDisabled: boolean
	setPriceRange:(arg:number[])=>void
	setIsPriceRange: (arg: boolean) => void
	resetFilters: () => void
	applyFilters: () => void
	spinner: boolean
}

 export interface ICatalogFiltersProps extends ICatalogFilters {	
	closePopup: VoidFunction
	isOpenFilters: boolean
}

export interface ICatalogFiltersMobile extends ICatalogFilters {	
	isOpenMobileFilter: boolean
	mode: string
	closePopup: VoidFunction	
}