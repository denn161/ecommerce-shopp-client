import { ManufacturerBlockItem } from '@/components/elements/ManufacturerBlogItem'
import { ICheckedFilterItem } from '@/types/catalog'
import cl from 'classnames'
import { Event } from 'effector'
import { motion,AnimatePresence } from 'framer-motion'
import React from 'react'

import styles from './ManufacturerBlog.module.scss'

interface IManufacturerItem{
	title:string 
	mode:string
	values:Array<ICheckedFilterItem>
	closeManufacturer:Event<ICheckedFilterItem>
}
const ManufacturerItem = ({title,mode,values,closeManufacturer}:IManufacturerItem) => {
	return (
		<motion.div
		initial={{ opacity: 0, transform: 'scale(0.9)' }}
    animate={{ opacity: 1, transform: 'scale(1)' }}
    exit={{ opacity: 0,transform: 'scale(0.9)'}}
		className={styles.manufacturer__item}>
			<h4
				className={cl(styles.manufacturer__title, {
					[styles.dark_mode]: mode === 'dark',
				})}
			>
			 {title}
			</h4>
		 
			<ul
				className={cl(styles.manufacturer__list, {
					[styles.dark_mode]: mode === 'dark',
				})}>
					 <AnimatePresence>
				{values.map((item, i) => (
					<ManufacturerBlockItem event={closeManufacturer} mode={mode} key={item.id} value={item} />
				))}
				</AnimatePresence>
			</ul>
			
		</motion.div>
	)
}

export default ManufacturerItem
