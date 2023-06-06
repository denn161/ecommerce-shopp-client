import cl from 'classnames'
import Link from 'next/link'

import CloseSvg from '../../Alert/svg/CloseSvg'

import styles from './CardPopup.module.scss'
import Counter from '@/components/elements/counter/Counter'
import { usePrice } from '@/hooks/usePrice'
import { IShoppingCard } from '@/types/shopping-card'
import { formatPrice } from '@/utils/common'

interface ICardPopupItem {
	item: IShoppingCard
	mode: string
}

const CardPopupItem = ({ item, mode }: ICardPopupItem) => {
	const { loading, decrementPrice, deleteProduct, incrementPrice, price } =
		usePrice(item)

	return (
		<li
			className={cl(styles.card__item, {
				[styles.dark]: mode === 'dark',
			})}
		>
			<div className={cl(styles.card__item_top)}>
				<div className={styles.card__item_img}>
					<img src={item.image} />
				</div>
				<Link
					href={`/catalog/${item.partId}`}
					className={cl(styles.card__item_title, {
						[styles.dark]: mode === 'dark',
					})}
				>
					{item.name.replace('.', '')}, {item.boiler_manufacturer},{' '}
					{item.parts_manufacturer}
				</Link>
				<button
					onClick={deleteProduct}
					className={cl(styles.card__item_close, {
						[styles.dark]: mode === 'dark',
					})}
				>
					{loading ? (
						<div className={`spinner-border ${mode}`} role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						<CloseSvg />
					)}
				</button>
			</div>
			<div className={cl(styles.card__item_bottom)}>
				{!item.in_stock ? (
					<span
						className={cl(styles.card__item_empty, {
							[styles.dark]: mode === 'dark',
						})}
					>
						Нет на складе
					</span>
				) : (
					<div className={cl(styles.card__item_counter)}>
						<Counter
							mode={mode}
							totalCount={item.in_stock}
							initialCount={item.count}
							decrementPrice={decrementPrice}
							incrementPrice={incrementPrice}
							partId={item.partId}
						/>
					</div>
				)}
				<span
					className={cl(styles.card__item_price, {
						[styles.dark]: mode === 'dark',
					})}
				>
					{formatPrice(price)}P
				</span>
			</div>
		</li>
	)
}

export default CardPopupItem
