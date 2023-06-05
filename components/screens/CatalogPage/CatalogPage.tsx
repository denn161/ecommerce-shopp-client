import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import ReactPaginate from 'react-paginate'

import styles from './CatalogPage.module.scss'
import { useCatalogPage } from './useCatalogPage'
import HeadTitle from '@/components/elements/head/HeadTitle'
import Skeleton from '@/components/elements/skeleton/Skeleton'
import { CatalogFilters } from '@/components/modules/CatalogFilters'
import CatalogProduct from '@/components/modules/CatalogProduct/CatalogProduct'
import { ManufacturerBlock } from '@/components/modules/ManufacturerBlog'
import { $mode } from '@/context/mode'
import { usePopup } from '@/hooks/usePopup'
import { IQueryParams } from '@/types/catalog'
import useWindowWidth from '@/hooks/useMediaQuery'

interface ICatalogPageProps {
	query: IQueryParams
}

export const CatalogPage = ({ query }: ICatalogPageProps) => {
	const mode = useStore($mode)
  const {isMedia} =useWindowWidth(820)
	const { closePopup, handleToggleOpen, open,btnRef } = usePopup()

	const {
		loading,
		boilerParts,
		currentPage,
		pageCount,
		handlePageChange,
		priceRange,
		setPriceRange,
		boilerValues,
		partsValues,
		isDisabled,
		resetFilters,
		isBoilerManufacturerChecked,
		isPartsManufacturersChecked,
		isPriceRange,
		setIsPriceRange,
		applyFilters,
		setLoading,
		spinner,
	} = useCatalogPage(query)

	return (
		<section className={styles.catalog}>
			<div className={cl('container', styles.catalog__container)}>
				<HeadTitle
					classNames={styles.catalog__title}
					mode={mode}
					title="Каталог товаров"
				/>
				<AnimatePresence>
					<ManufacturerBlock
					  isMobile={isMedia}
						setLoading={setLoading}
						isBoiler={isBoilerManufacturerChecked}
						isParts={isPartsManufacturersChecked}
						isPriceChanged={isPriceRange}
						partsValues={partsValues}
						boilersValues={boilerValues}
						resetFilters={resetFilters}
						togglePopup={handleToggleOpen}
					/>
				</AnimatePresence>
				<div className={cl(styles.catalog__bottom)}>
					<div className={styles.catalog__inner}>
						<CatalogFilters
						  isOpenFilters={open}
							closePopup={closePopup}
							spinner={spinner}
							applyFilters={applyFilters}
							resetFilters={resetFilters}
							isDisabled={isDisabled}
							setIsPriceRange={setIsPriceRange}
							priceRange={priceRange}
							setPriceRange={setPriceRange}
						/>
						<ul className={cl(styles.catalog__products)}>
							{loading ? (
								[...Array(20)].map((_, i) => (
									<Skeleton
										key={i}
										mode={mode}
										style={{ width: '250px' }}
										loading={loading}
									/>
								))
							) : (
								<>
									{boilerParts.rows?.length ? (
										boilerParts.rows.map((item) => (
											<CatalogProduct
												key={item.id}
												item={item}
												mode={mode}
												style={{}}
											/>
										))
									) : (
										<span>Список товаров пуст</span>
									)}
								</>
							)}
						</ul>
					</div>
					<ReactPaginate
						containerClassName={cl(styles.catalog__paginate_list)}
						pageClassName={cl(styles.catalog__paginate_item)}
						pageLinkClassName={cl(styles.catalog__paginate_link, {
							[styles.dark_mode]: mode === 'dark',
						})}
						breakClassName={cl(styles.catalog__paginate_break)}
						breakLinkClassName={cl(styles.catalog__paginate_break_link)}
						breakLabel="..."
						pageCount={pageCount}
						forcePage={currentPage}
						previousClassName={styles.catalog__paginate_prev}
						nextClassName={styles.catalog__paginate_next}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</section>
	)
}
