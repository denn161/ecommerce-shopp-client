import cl from 'classnames'
import { useStore } from 'effector-react'

import styles from './CatalogFilters.module.scss'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import CheckedFiltersList from './CheckedFiltersList'
import AccordionFilter from './FilterAccordion/AccardionFilter'
import FilterActions from './FilterActions'
import PriceRange from '@/components/elements/price-range/PriceRange'
import {
	$boillerManufacturers,
	$partsManufacturers,
	setBoilersManufacturers,
	setPartsManufacturers,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boiler-parts'
import { $mode } from '@/context/mode'
import useWindowWidth from '@/hooks/useMediaQuery'
import { ICatalogFiltersProps } from '@/types/catalog'

export const CatalogFilters = ({
	priceRange,
	setPriceRange,
	setIsPriceRange,
	isDisabled,
	resetFilters,
	applyFilters,
	spinner,
	closePopup,
	isOpenFilters,
}: ICatalogFiltersProps) => {
	const mode = useStore($mode)
	const { isMedia } = useWindowWidth(820)
	const boilerManufacturers = useStore($boillerManufacturers)
	const partsManufacturer = useStore($partsManufacturers)

	return (
		<>
			<div
				className={cl(styles.filters, {
					[styles.dark]: mode === 'dark',
					[styles.open]: isOpenFilters,
				})}
			>
				{isMedia ? (
					<CatalogFiltersMobile
						isOpenMobileFilter={isOpenFilters}
						closePopup={closePopup}
						priceRange={priceRange}
						isDisabled={isDisabled}
						setPriceRange={setPriceRange}
						setIsPriceRange={setIsPriceRange}
						resetFilters={resetFilters}
						applyFilters={applyFilters}
						spinner={spinner}
						mode={mode}
					/>
				) : (
					<>
						<h3
							className={cl(styles.filters__title, {
								[styles.dark]: mode === 'dark',
							})}
						>
							Фильтры
						</h3>
						<AccordionFilter
							isMobileFilters={isMedia}
							title={'Производители котлов'}
							titleClass={styles.filters__list_title}
						>
							<CheckedFiltersList
								updateManufacturer={updateBoilerManufacturer}
								setManufacturer={setBoilersManufacturers}
								items={boilerManufacturers}
								mode={mode}
							/>
						</AccordionFilter>
						<AccordionFilter
							title={'Цена'}
							titleClass={styles.filters__list_title}
						>
							<PriceRange
								setIsPriceRange={setIsPriceRange}
								mode={mode}
								priceRange={priceRange}
								setPriceRange={setPriceRange}
							/>
							<div style={{ height: 47 }}></div>
						</AccordionFilter>
						<AccordionFilter
							isMobileFilters={isMedia}
							title={'Производители запчастей'}
							titleClass={styles.filters__list_title}
						>
							<CheckedFiltersList
								updateManufacturer={updatePartsManufacturer}
								setManufacturer={setPartsManufacturers}
								items={partsManufacturer}
								mode={mode}
							/>
						</AccordionFilter>
						<FilterActions
							btnText={'Сбросить'}
							isDisabled={isDisabled}
							isResetBtn
							resetFilters={resetFilters}
							applyFilters={applyFilters}
							mode={mode}
							spinner={spinner}
						/>
					</>
				)}
			</div>
		</>
	)
}
