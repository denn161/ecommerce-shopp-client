import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import CardPopupItem from '../header/CardPopup/CardPopupItem'

import styles from './Order.module.scss'
import { OrderItem } from './OrderItem'
import CardSvg from './svg/CardSvg'
import DoneSvg from './svg/DoneSvg'
import EditSvg from './svg/EditSvg'
import { $mode } from '@/context/mode'
import { $shoppingCard, $totalPrice } from '@/context/shopping-card'
import useWindowWidth from '@/hooks/useMediaQuery'
import { formatPrice } from '@/utils/common'

interface IOrderAccordion {
	setOrderIsReady: (arg: boolean) => void
	showDoneIcon: boolean
}

const OrderAccordion = ({ setOrderIsReady, showDoneIcon }: IOrderAccordion) => {
	const [expanded, setExpanded] = useState(true)
	const mode = useStore($mode)
	const shoppingCart = useStore($shoppingCard)
	const totalPrice = useStore($totalPrice)
	const { isMedia: isMedia550 } = useWindowWidth(550)

	const openAccordion = () => {
		setOrderIsReady(false)
		setExpanded(true)
		console.log('open')
	}
	const closeAccordion = () => {
		setOrderIsReady(true)
		setExpanded(false)
	}

	return (
		<>
			<motion.div
				initial={false}
				className={cl(styles.order__cart_header, {
					[styles.dark]: mode === 'dark',
				})}
			>
				<h3
					className={cl(styles.order__cart_title, {
						[styles.dark]: mode === 'dark',
					})}
				>
					{showDoneIcon ? <DoneSvg /> : <CardSvg />}
					Корзина
				</h3>
				<button
					className={cl(styles.order__cart_btn, {
						[styles.dark]: mode === 'dark',
					})}
					onClick={openAccordion}
				>
					<span>
						<EditSvg />
					</span>
					{isMedia550 ? '' : 'Редактировать'}
				</button>
			</motion.div>
			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						style={{ overflow: 'hidden' }}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						<div
							className={cl(styles.order__cart_content, {
								[styles.dark]: mode === 'dark',
							})}
						>
							<ul className={styles.order__cart_list}>
								{!!shoppingCart.length ? (
									shoppingCart.map((item) =>
										isMedia550 ? (
											<CardPopupItem mode={mode} key={item.id} item={item} />
										) : (
											<OrderItem item={item} key={item.id} mode={mode} />
										)
									)
								) : (
									<li
										className={cl(styles.order__cart_empty, {
											[styles.dark]: mode === 'dark',
										})}
									>
										Корзина пуста
									</li>
								)}
							</ul>
						</div>
						<div
							className={cl(styles.order__cart_footer, {
								[styles.dark]: mode === 'dark',
							})}
						>
							<div className={styles.order__cart_footer_total}>
								<span
									className={cl(styles.order__cart_footer_total_text, {
										[styles.dark]: mode === 'dark',
									})}
								>
									Общая сумма заказа:
								</span>
								<span
									className={cl(styles.order__cart_footer_total_price, {
										[styles.dark]: mode === 'dark',
									})}
								>
									{formatPrice(totalPrice)} P
								</span>
							</div>
							<button
								className={cl(styles.order__cart_footer_btn, {
									[styles.dark]: mode === 'dark',
								})}
								onClick={closeAccordion}
								disabled={!shoppingCart.length}
							>
								Продолжить
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default OrderAccordion
