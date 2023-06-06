import cl from 'classnames'
import Link from 'next/link'

import styles from './Order.module.scss'
import Counter from '@/components/elements/counter/Counter'
import Spinner from '@/components/elements/spinner/Spinner'
import useWindowWidth from '@/hooks/useMediaQuery'
import { usePrice } from '@/hooks/usePrice'
import { IShoppingCard } from '@/types/shopping-card'
import { formatPrice } from '@/utils/common'

interface IOrderItemProps {
	item: IShoppingCard
	mode: string
}

export const OrderItem = ({ item, mode }: IOrderItemProps) => {
	const { isMedia: isMedia1160 } = useWindowWidth(1160)

	const { loading, deleteProduct, incrementPrice, decrementPrice, price } =
		usePrice(item)

	return (
		<li className={styles.order__cart_item}>
			<div className={styles.order__cart_item_left}>
				<div className={styles.order__cart_item_inner}>
					<div className={styles.order__cart_item_image}>
						<img src={item.image} alt={item.name} />
					</div>
					<Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
						<span
							className={cl(styles.order__cart_item_name, {
								[styles.dark]: mode === 'dark',
							})}
						>
							{item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
							{item.boiler_manufacturer}
						</span>
					</Link>
				</div>
				{item.in_stock === 0 ? (
					<span className={styles.order__cart__list_item_empty}>
						Нет на складе
					</span>
				) : (
					<Counter
						totalCount={item.in_stock}
						partId={item.partId}
						initialCount={item.count}
						incrementPrice={incrementPrice}
						decrementPrice={decrementPrice}
						mode={mode}
					/>
				)}
			</div>
			<div className={styles.order__cart_item_right}>
				<span
					className={cl(styles.order__cart_item_right_price, {
						[styles.dark]: mode === 'dark',
					})}
				>
					{formatPrice(price)} P
				</span>
				<button
					className={cl(styles.order__cart_item_right_delete, {
						[styles.dark]: mode === 'dark',
					})}
					onClick={deleteProduct}
				>
					{loading ? <Spinner /> : 'Удалить'}
				</button>
			</div>
		</li>
	)
}
