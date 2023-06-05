import styles from './CatalogFilters.module.scss'
import cl from 'classnames'

interface IFilterActions{
	 applyFilters:VoidFunction 
	 spinner:boolean 
	 isDisabled:boolean 
	 mode:string 
	 resetFilters:VoidFunction 
	 isResetBtn:boolean
	 btnText?:string 
	 handleClosePopup?:()=>void
	 
}

const FilterActions = ({applyFilters,spinner,isDisabled,isResetBtn,mode,resetFilters,btnText,handleClosePopup}:IFilterActions) => {

	const modeClass = mode==='dark'?'text-light':'text-dark'
	return (
		<div className={cl(styles.filters__actions,{
			[styles.dark]:mode==='dark'
		})}>
		<button
		 onClick={applyFilters}
		 className={cl(styles.filters__actions_btn,{
			[styles.mobile]:!isResetBtn
		 })}
		 disabled={spinner||isDisabled}>
		{spinner? (
<div className={`spinner-border ${modeClass}`} role="status">
	<span className="visually-hidden">Loading...</span>
</div>
):('Показать')}
			</button>
		  {isResetBtn?(
					<button
				   onClick={btnText==='Сбросить'?resetFilters:handleClosePopup}
				   disabled={btnText==='Сбросить'?isDisabled:false}>
				   {btnText}
				 </button>
			):''}
	</div>
	)
}

export default FilterActions