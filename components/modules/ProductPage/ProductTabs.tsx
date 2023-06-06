import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import Compatibility from './Compatibility'
import Description from './Description'
import styles from './ProductPage.module.scss'
import { $boilerPart } from '@/context/boiler-part'
import { $mode } from '@/context/mode'

const ProductTabs = () => {
	const [showDescription, setShowDescription] = useState(true)
	const [showCompatibility, setShowCompatibility] = useState(false)

	const mode = useStore($mode)
	const boilerPart = useStore($boilerPart)

	const handleShowDescr = () => {
		setShowDescription(true)
		setShowCompatibility(false)
	}
	const handleShowCompat = () => {
		setShowDescription(false)
		setShowCompatibility(true)
	}

	return (
		<div className={styles.product__top_tabs}>
			<div className={styles.product__top_tabs_actions}>
				<button
					onClick={handleShowDescr}
					className={cl(styles.product__top_tabs_actions_btn, {
						[styles.current]: showDescription,
					})}
				>
					Описание
				</button>
				<button
					onClick={handleShowCompat}
					className={cl(styles.product__top_tabs_actions_btn, {
						[styles.current]: showCompatibility,
					})}
				>
					Совместимость
				</button>
			</div>
			<AnimatePresence>
				{showDescription && <Description item={boilerPart} mode={mode} />}
				{showCompatibility && <Compatibility item={boilerPart} mode={mode} />}
			</AnimatePresence>
		</div>
	)
}

export default ProductTabs
