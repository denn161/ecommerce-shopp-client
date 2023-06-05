import cl from 'classnames'

import styles from '../CatalogFilters.module.scss'
import PopupArrowSvg from '../svg/PopupArrowSvg'

interface IPopup {
	title: string |false
	btnText: string
	resetFilters: VoidFunction
	isDisabled: boolean
	closePopup: VoidFunction
	mode: string
}

const CatalogFiltersTop = ({
	title,
	resetFilters,
	btnText,
	isDisabled,
	closePopup,
	mode,
}: IPopup) => {
	return (
		<div className={cl(styles.filters__mobile_top,{
			[styles.dark]:mode==='dark'
		})}>
			<button
				onClick={closePopup}
				className={cl(styles.filters__mobile_top_closebtn,{
					[styles.dark]:mode==='dark'
				})}
			>
				<PopupArrowSvg />
			</button>
			<h4 
			className={cl(styles.filters__mobile_top_title,{
				[styles.dark]:mode==='dark'
			})}>{title}</h4>
			<button
				className={cl(styles.filters__mobile_top_resetbtn)}
				onClick={resetFilters}
				disabled={isDisabled}
			>
				{btnText}
			</button>
		</div>
	)
}

export default CatalogFiltersTop
