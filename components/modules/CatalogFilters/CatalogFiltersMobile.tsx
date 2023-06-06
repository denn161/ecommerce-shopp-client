import cl from 'classnames'

import styles from './CatalogFilters.module.scss'
import FilterActions from './FilterActions'
import CatalogFiltersTop from './popup/CatalogFiltersTop'
import FiltersPopup from './popup/FiltersPopup'
import ArrowSvg from './svg/ArrowSvg'
import useFiltersMobile from './useFiltersMobile'
import PriceRange from '@/components/elements/price-range/PriceRange'
import {
	setBoilersManufacturers,
	setPartsManufacturers,
	updateBoilerManufacturer,
	updatePartsManufacturer,
} from '@/context/boiler-parts'
import { ICatalogFiltersMobile } from '@/types/catalog'

const CatalogFiltersMobile = ({
	priceRange,
	isDisabled,
	setPriceRange,
	setIsPriceRange,
	resetFilters,
	applyFilters,
	spinner,
	mode,
	closePopup,
	isOpenMobileFilter,
}: ICatalogFiltersMobile) => {
	const {
		isBoilerChecked,
		isPartsChecked,
		handleCloseBoilerPopup,
		handleClosePartsPopup,
		handleOpenBoilerPopup,
		handleOpenPartsPopup,
		boilerManufacturers,
		partsManufacturer,
		openBoilers,
		openParts,
	} = useFiltersMobile()

	const resetBoilerManufacturers = () =>
		setBoilersManufacturers(
			boilerManufacturers.map((item) => ({ ...item, checked: false }))
		)

	const resetPartsManufacturers = () =>
		setPartsManufacturers(
			partsManufacturer.map((item) => ({ ...item, checked: false }))
		)

	const applyFiltersAndClosePopup = async () => {
		closePopup()
		applyFilters()
	}
	return (
		<div
			className={cl(styles.filters__mobile, {
				[styles.open]: isOpenMobileFilter,
			})}
		>
			<div className={styles.filters__mobile_inner}>
				<CatalogFiltersTop
					closePopup={closePopup}
					isDisabled={isDisabled}
					mode={mode}
					resetFilters={resetFilters}
					btnText={'Сбросить все'}
					title={'Фильтры'}
				/>
				<div className={styles.filters__mobile_boilers}>
					<button
						onClick={handleOpenBoilerPopup}
						className={cl(styles.filters__mobile_boilers_btn, {
							[styles.dark]: mode === 'dark',
						})}
					>
						Производители котлов
						<ArrowSvg />
					</button>
					<FiltersPopup
						resetAll={resetBoilerManufacturers}
						isDisabled={!isBoilerChecked}
						applyFilters={applyFilters}
						spinner={spinner}
						handleClosePopup={handleCloseBoilerPopup}
						updateManufacturers={updateBoilerManufacturer}
						setManufacturers={setBoilersManufacturers}
						manufacturersList={boilerManufacturers}
						openPopup={openBoilers}
						title={'Производители котлов'}
					/>
				</div>
				<div className={styles.filters__mobile_parts}>
					<button
						onClick={handleOpenPartsPopup}
						className={cl(styles.filters__mobile_boilers_btn, {
							[styles.dark]: mode === 'dark',
						})}
					>
						Производители запчастей
						<ArrowSvg />
					</button>
					<FiltersPopup
						resetAll={resetPartsManufacturers}
						isDisabled={!isPartsChecked}
						applyFilters={applyFilters}
						spinner={spinner}
						handleClosePopup={handleClosePartsPopup}
						updateManufacturers={updatePartsManufacturer}
						setManufacturers={setPartsManufacturers}
						manufacturersList={partsManufacturer}
						openPopup={openParts}
						title={'Производители запчастей'}
					/>
				</div>
				<div className={cl(styles.filters__mobile_price)}>
					<h4
						className={cl(styles.filters__mobile_price_title, {
							[styles.dark]: mode === 'dark',
						})}
					>
						Цена
					</h4>
					<PriceRange
						mode={mode}
						priceRange={priceRange}
						setPriceRange={setPriceRange}
						setIsPriceRange={setIsPriceRange}
					/>
				</div>
			</div>
			<FilterActions
				isDisabled={isDisabled}
				isResetBtn={false}
				applyFilters={applyFiltersAndClosePopup}
				spinner={spinner}
				handleClosePopup={closePopup}
				resetFilters={resetFilters}
				mode={mode}
			/>
		</div>
	)
}

export default CatalogFiltersMobile
