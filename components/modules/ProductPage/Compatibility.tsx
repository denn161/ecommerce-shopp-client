import cl from 'classnames'
import { motion } from 'framer-motion'

import styles from './ProductPage.module.scss'
import { IBoilerPart } from '@/types/boiler-parts'

interface ICompatibility {
	item: IBoilerPart
	mode: string
}
const Compatibility = ({ item, mode }: ICompatibility) => {
	return (
		<motion.div
			initial={{ opacity: 0, transform: 'scale(0.9)' }}
			animate={{ opacity: 1, transform: 'scale(1)' }}
			exit={{ opacity: 0 }}
			className={cl(styles.product__top_tabs_descr, {
				[styles.dark]: mode === 'dark',
			})}
		>
			<p
				className={cl(styles.product__top_tabs_text, {
					[styles.dark]: mode === 'dark',
				})}
			>
				{item.compatibiliti}
			</p>
		</motion.div>
	)
}

export default Compatibility
