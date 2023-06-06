import cl from 'classnames'

import styles from './ProductPage.module.scss'
import { useProductPage } from './useProductPage'
import Accordion from '@/components/elements/accordion/Accordion'
import CartHoverCheckedSvg from '@/components/modules/CatalogProduct/svg/CartCheckedSvg'
import CartSvg from '@/components/modules/CatalogProduct/svg/CartSvg'
import Compatibility from '@/components/modules/ProductPage/Compatibility'
import Description from '@/components/modules/ProductPage/Description'
import ProductImageSlider from '@/components/modules/ProductPage/ProductImageSlider'
import ProductTabs from '@/components/modules/ProductPage/ProductTabs'
import DashBoardSlider from '@/components/modules/slider/DashBoardSlider'
import useCatalogProduct from '@/hooks/useCatalogProduct'
import { formatPrice } from '@/utils/common'

interface IProductPageProps {}

export const ProductPage = ({}: IProductPageProps) => {
	const { boilerPart, isMobile850, parts, loading, mode } = useProductPage()

	const { spinner, toggleCart, isChecked, modeClass } = useCatalogProduct({
		item: boilerPart,
		mode,
	})
	return (
		<section className={cl(styles.product)}>
			<div className="container">
				<div className={styles.product__top}>
					<h2
						className={cl(styles.product__top_title, {
							[styles.dark]: mode === 'dark',
						})}
					>
						{boilerPart.name}
					</h2>
					<div className={styles.product__top_inner}>
						<ProductImageSlider />
						<div className={styles.product__top_info}>
							<span
								className={cl(styles.product__top_info_price, {
									[styles.dark]: mode === 'dark',
								})}
							>
								{formatPrice(boilerPart.price || 0)}P
							</span>
							<span
								className={cl(styles.product__top_info_stock, {
									[styles.dark]: mode === 'dark',
									[styles.success]: boilerPart.in_stock,
									[styles.no]: !boilerPart.in_stock,
								})}
							>
								{boilerPart.in_stock ? 'В наличии' : 'Нет на складе'}
							</span>
							<span
								className={cl(styles.product__top_info_code, {
									[styles.dark]: mode === 'dark',
								})}
							>
								Артикул:{boilerPart.vendor_code}
							</span>
							<button
								onClick={toggleCart}
								className={cl(styles.product__top_info_btn, {
									[styles.add]: isChecked,
								})}
							>
								{spinner ? (
									<div className={`spinner-border ${modeClass}`} role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								) : (
									<>
										{isChecked ? (
											<>
												<CartHoverCheckedSvg />
												<span>Товар в корзине</span>
											</>
										) : (
											<>
												<CartSvg />
												<span>Добавить в корзину</span>
											</>
										)}
									</>
								)}
							</button>
							{!isMobile850 && <ProductTabs />}
						</div>
					</div>
				</div>
				{isMobile850 && (
					<div className={styles.product__acardion}>
						<div className={styles.product__acordion_inner}>
							<Accordion
								title={'Описание'}
								titleClass={styles.product__acordion_title}
							>
								<Description item={boilerPart} mode={mode} />
							</Accordion>
							<Accordion
								title={'Совместимость'}
								titleClass={styles.product__acordion_title}
							>
								<Compatibility item={boilerPart} mode={mode} />
							</Accordion>
						</div>
					</div>
				)}
				<div className={styles.product__bottom}>
					<h2
						className={cl(styles.product__bottom_title, {
							[styles.dark]: mode === 'dark',
						})}
					>
						Вам понравится
					</h2>
					{!!parts.rows?.length && (
						<DashBoardSlider
							items={parts.rows}
							gotoPartPage
							loading={loading}
						/>
					)}
				</div>
			</div>
		</section>
	)
}
