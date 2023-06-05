'use client'

import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './AccardionFilter.module.scss'

import ArrowSvg from '../svg/ArrowSvg'
import { useAccardion } from '@/components/elements/accordion/useAccordion'
import { $mode } from '@/context/mode'

interface IAccordion {
	title: string | false
	children: React.ReactNode
	titleClass: string
	isMobileFilters?:boolean
}
const AccordionFilter = ({ title,isMobileFilters, children, titleClass}: IAccordion) => {
	const { expandet, handleToggleAccordion } = useAccardion()
	const mode = useStore($mode)

	return (
		<>
		  {title?(<motion.button
				initial={false}
				onClick={handleToggleAccordion}
				className={cl(styles.acc__btn, {
					[styles.dark__mode]: mode === 'dark',
					[styles.open]: expandet,
				})}
			>
				<span className={cl(titleClass)}>{title}</span>
				<span className={cl(styles.acc__arrow)}>
					<ArrowSvg />
				</span>
			</motion.button>):''}
       {title&&isMobileFilters?<button className={cl(styles.acc__mobile_btn,{
					[styles.dark__mode]: mode === 'dark',
					[styles.mobile]:isMobileFilters,
					[styles.open]: expandet
			 })}>{title}</button>:''}
			<AnimatePresence initial={false}>
				{isMobileFilters||expandet && (
					<motion.div
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						style={{ overflow: 'hidden' }}
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

export default AccordionFilter
