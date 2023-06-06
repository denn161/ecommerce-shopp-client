import cl from 'classnames'
import { Event } from 'effector'
import { motion } from 'framer-motion'

import styles from './ManufacturerBlogItem.module.scss'
import CloseSvgBlog from './svg/CloseSvgBlog'
import { ICheckedFilterItem } from '@/types/catalog'

interface IManufacturerBlogProps {
	value: ICheckedFilterItem
	mode: string
	event: Event<ICheckedFilterItem>
}
export const ManufacturerBlockItem = ({
	value: { id, title, checked },
	mode,
	event,
}: IManufacturerBlogProps) => {
	const closeManufacturer = () =>
		event({ checked: !checked, id } as ICheckedFilterItem)

	return (
		<motion.li
			initial={{ opacity: 0, transform: 'scale(0.9)' }}
			animate={{ opacity: 1, transform: 'scale(1)' }}
			exit={{ opacity: 0 }}
			className={cl(styles.item, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			{title}
			<button
				onClick={closeManufacturer}
				className={cl(styles.item__btn, {
					[styles.dark_mode]: mode === 'dark',
				})}
			>
				<CloseSvgBlog />
			</button>
		</motion.li>
	)
}
