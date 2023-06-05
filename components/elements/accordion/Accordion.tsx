'use client'

import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

import styles from './Accordion.module.scss'
import { useAccardion } from './useAccordion'
import { $mode } from '@/context/mode'

interface IAccordion {
	title: string | false
	children: React.ReactNode
	titleClass: string
	classBtn?: string
}

const Accordion = ({ title, children, titleClass, classBtn }: IAccordion) => {
	const { expandet, handleToggleAccordion } = useAccardion()
	const mode = useStore($mode)

	return (
		<>
			<motion.button
				initial={false}
				onClick={() => handleToggleAccordion()}
				className={cl(styles.acc__btn, classBtn)}
			>
				<span
					className={cl(titleClass, styles.acc__title, {
						[styles.dark_mode]: mode === 'dark',
						[styles.open]: expandet,
					})}
				>
					{title}
				</span>
			</motion.button>
			<AnimatePresence initial={false}>
				{expandet && (
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

export default Accordion
