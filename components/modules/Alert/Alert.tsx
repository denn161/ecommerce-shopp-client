import cl from 'classnames'
import Link from 'next/link'

import styles from './Alert.module.scss'
import CloseSvg from './svg/CloseSvg'
import { formatPrice, sklonenie } from '@/utils/common'

interface IAlertProps {
	count: number
	closeAlert: VoidFunction
	mode: string
	totalPrice: number
}
export const Alert = ({ count, closeAlert, mode, totalPrice }: IAlertProps) => (
	<div
		className={cl(styles.alert, {
			[styles.dark_mode]: mode === 'dark',
		})}
	>
		<div
			className={cl(styles.alert__info, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			<span>
				В корзине {count} {sklonenie(count, ['товар', 'товара', 'товаров'])}
			</span>
			<span>на сумму {formatPrice(totalPrice)} ₽</span>
		</div>
		<div className={styles.alert__actions}>
			<Link href={'/order'}>
				<button>Перейти в корзину</button>
			</Link>
			<Link href={'/order'}>
				<button>Оформить заказ</button>
			</Link>
		</div>
		<button
			onClick={closeAlert}
			className={cl(styles.alert__btn, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			<CloseSvg />
		</button>
	</div>
)
