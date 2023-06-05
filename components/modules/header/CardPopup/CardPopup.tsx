import cl from 'classnames'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { forwardRef } from 'react'


import CardPopupSvg from '../svg/CardPopupSvg'
import CardSvg from '../svg/CardSvg'

import styles from './CardPopup.module.scss'
import CardPopupItem from './CardPopupItem'
import useCardPopup from './useCardPopup'
import { IComponentProfile } from '@/types/common'
import { formatPrice } from '@/utils/common'
import { witchClickAutside } from '@/utils/witchClickOutside'

const CardPopup = forwardRef<HTMLDivElement, IComponentProfile>(
	({ open, setOpen }, ref) => {	
     const {totalPrice,cards,mode,} =useCardPopup()
		const toggleCardDropDown = () => setOpen(!open)		

		return (
			<div
				className={cl(styles.card, {
					[styles.dark_mode]: mode === 'dark',
				})}
				ref={ref}
			>
				<button onClick={toggleCardDropDown} className={cl(styles.card__btn)}>
					{!!cards.length && (
						<span className={styles.card__count}>{cards.length}</span>
					)}
					<span>
						<CardSvg />
					</span>
					<span>Корзина</span>
				</button>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							style={{ transformOrigin: 'right-top' }}
							className={cl(styles.card__popup, {
								[styles.dark_mode]: mode === 'dark',
							})}
						>
							<h3
								className={cl(styles.card__title, {
									[styles.dark_mode]: mode === 'dark',
								})}
							>
								<CardPopupSvg />
								Корзина
							</h3>
							<ul
								className={cl(styles.card__popup_list, {
									[styles.empty]: !cards.length,
								})}
							>
								{!!cards.length ? (
									cards.map((card) => (
										<CardPopupItem mode={mode} item={card} key={card.id} />
									))
								) : (
									<li
										className={cl(styles.card__popup_empty, {
											[styles.dark_mode]: mode === 'dark',
										})}
									>
										<span>Корзина пуста</span>
									</li>
								)}
							</ul>
							<div className={styles.card__popup_footer}>
								<div
									className={cl(styles.card__popup_footer_total, {
										[styles.dark_mode]: mode === 'dark',
									})}
								>
									<span
										className={cl(styles.card__popup_footer_text, {
											[styles.dark_mode]: mode === 'dark',
										})}
									>
										Общая сумма заказа
									</span>
									<span
										className={cl(styles.card__popup_footer_total_price, {
											[styles.dark_mode]: mode === 'dark',
										})}
									>
										{formatPrice(totalPrice)}P
									</span>
								</div>
								<Link
									href={'/order'}
									passHref
									legacyBehavior
									className={cl(styles.card__footer_link)}
								>
									<button
										className={cl(styles.card__popup_footer_btn, {
											[styles.dark_mode]: mode === 'dark',
										})}
										disabled={!cards.length}
									>
										Оформить заказ
									</button>
								</Link>
							</div>
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		)
	}
)
CardPopup.displayName = 'CardPopup'
export default witchClickAutside(CardPopup)
