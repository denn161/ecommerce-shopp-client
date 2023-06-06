import cl from 'classnames'
import Link from 'next/link'

import styles from './CatalogProduct.module.scss'
import CartHoverCheckedSvg from './svg/CartCheckedSvg'
import CartSvg from './svg/CartSvg'
import useCatalogProduct from '@/hooks/useCatalogProduct'
import { IBoilerPart } from '@/types/boiler-parts'
import { formatPrice } from '@/utils/common'

interface IProductCard {
	item: IBoilerPart
	style: {}
	goTo?: boolean
	mode: string
}
const CatalogProduct = ({ item, style, goTo, mode }: IProductCard) => {
	const { isChecked, spinner, toggleCart, modeClass } = useCatalogProduct({
		item,
		mode,
	})

	return (
		<li
			className={cl(styles.product, {
				[styles.dark_mode]: mode === 'dark',
			})}
			style={style}
		>
			<div className={styles.product__image}>
				<img src={JSON.parse(item.images)[0]} alt="ProductImg" />
			</div>
			<div className={styles.product__content}>
				<Link href={`/catalog/${item.id}`}>
					<h3
						className={cl(styles.product__name, {
							[styles.dark_mode]: mode === 'dark',
						})}
					>
						{item.name}
					</h3>
				</Link>
				<div
					className={cl(styles.product__code, {
						[styles.dark_mode]: mode === 'dark',
					})}
				>
					<div>Артикул:</div>
					<div>{item.vendor_code}</div>
				</div>
			</div>
			<div className={cl(styles.product__footer)}>
				<div
					className={cl(styles.product__price, {
						[styles.dark_mode]: mode === 'dark',
					})}
				>
					{formatPrice(item.price)}Р
				</div>
				<button
					onClick={toggleCart}
					disabled={spinner}
					className={cl(styles.product__footer_btn, {
						[styles.dark_mode]: mode === 'dark',
						[styles.checked]: isChecked,
					})}
				>
					{spinner ? (
						<div className={`spinner-border ${modeClass}`} role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<>{isChecked ? <CartHoverCheckedSvg /> : <CartSvg />}</>
					)}
				</button>
			</div>
		</li>
	)
}

export default CatalogProduct
