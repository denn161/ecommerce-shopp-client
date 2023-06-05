import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './ManufacturerBlog.module.scss'
import ManufacturerItem from './ManufacturerItem'
import { $mode } from '@/context/mode'
import ManufacturerSelect from './select-manufacturer/ManufacturerSelect'
import { ICheckedFilterItem } from '@/types/catalog'
import {
	updateBoilerManufacturer,
	updatePartsManufacturer
	
} from '@/context/boiler-parts'
import { boilerManufacturers } from '@/utils/catalog'
import FilterSvg from './svg/FilterSvg'
import useWindowWidth from '@/hooks/useMediaQuery'

interface IManufacturerBlogProps {
	boilersValues:Array<ICheckedFilterItem>
	partsValues:Array<ICheckedFilterItem>
	isPriceChanged:boolean
	isBoiler:boolean 
	isParts:boolean 
	resetFilters:()=>void
	setLoading:(arg0:boolean)=>void
	togglePopup:()=>void
	isMobile:boolean
	
}

export const ManufacturerBlock = ({
	boilersValues,
	partsValues,
	isPriceChanged,
	isBoiler,
	isParts,
	resetFilters,
	setLoading,
	togglePopup,
	isMobile
}: IManufacturerBlogProps) => {
	const mode = useStore($mode)
	

	const isDisabled = !(isBoiler||isParts ||isPriceChanged)
	
	const {isMedia} =useWindowWidth(820)
 

	return (
		<motion.div
			initial={{ opacity: 0, transform: 'scale(0.9)' }}
			animate={{ opacity: 1, transform: 'scale(1)' }}
			exit={{ opacity: 0 }}
			className={cl(styles.manufacturer, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			{!!boilersValues.length&&!isMobile&&(<AnimatePresence>
				<ManufacturerItem
			  closeManufacturer={updateBoilerManufacturer}
				values={boilersValues}
				mode={mode}
				title={'Производители котлов'}
			/>
			</AnimatePresence>)}
			{!!partsValues.length&&!isMobile&&(<AnimatePresence>
				<ManufacturerItem
			  closeManufacturer={updatePartsManufacturer}
				values={partsValues}
				mode={mode}
				title={'Производители запчастей'}
			/>
			</AnimatePresence>)}
			<div className={styles.manufacturer__footer}>        
				<button
			  	disabled={isDisabled}
					onClick={resetFilters}
					className={cl(styles.manufacturer__btn, {
						[styles.dark_mode]: mode === 'dark',
					})}
				>
					Сбросить фильтр
				</button>
         {isMedia&&(
					  <button
						 onClick={togglePopup}
						className={cl(styles.manufacturer__filters_btn,{
							[styles.dark]:mode==='dark'
						})}>
						<FilterSvg/>
						Фильтр
					</button>
				 )}
				 <ManufacturerSelect setLoading={setLoading}/>
			</div>
		</motion.div>
	)
}
