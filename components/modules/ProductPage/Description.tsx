import cl from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './ProductPage.module.scss'
import { IBoilerPart } from '@/types/boiler-parts'

interface IDescription {
	item: IBoilerPart
	mode: string
}
const Description = ({ item, mode }: IDescription) => {
	return (
		<motion.div
			initial={{ opacity: 0, transform: 'scale(0.9)' }}
			animate={{ opacity: 1, transform: 'scale(1)' }}
			exit={{ opacity: 0 }}
			className={cl(styles.product__top_tabs_descr, {
				[styles.dark]: mode === 'dark',
			})}
		>
			<h3
				className={cl(styles.product__top_tabs_title, {
					[styles.dark]: mode === 'dark',
				})}
			>
				{item.name}
			</h3>
			<p
				className={cl(styles.product__top_tabs_text, {
					[styles.dark]: mode === 'dark',
				})}
			>
				{item.description}
			</p>
		</motion.div>
	)
}

export default Description
