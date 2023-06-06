import cl from 'classnames'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './DashBoardPage.module.scss'
import { useDashboard } from './useDashboard'
import HeadTitle from '@/components/elements/head/HeadTitle'
import { Alert } from '@/components/modules/Alert'
import BrandsSlider from '@/components/modules/slider/BrandsSlider'
import DashBoardSlider from '@/components/modules/slider/DashBoardSlider'
import { $mode } from '@/context/mode'

const DashBoardPage = () => {
	const {
		newParts,
		bestsellers,
		loading,
		showAlert,
		handleCloseAlert,
		shoppingCart,
		totalPrice,
		countProductInCart,
	} = useDashboard()
	const mode = useStore($mode)

	return (
		<section className={styles.dashboard}>
			<div className={cl('container', styles.dashboard__container)}>
				<AnimatePresence>
					{showAlert && (
						<motion.div
							initial={{ opacity: 0, transform: 'scale(0.9)' }}
							animate={{ opacity: 1, transform: 'scale(1)' }}
							exit={{ opacity: 0 }}
							className={styles.dashboard__alert}
						>
							<Alert
								totalPrice={totalPrice}
								mode={mode}
								closeAlert={handleCloseAlert}
								count={countProductInCart}
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<BrandsSlider />
				<HeadTitle
					mode={mode}
					classNames={styles.dashboard__title}
					title={'Детали для газовых котлов'}
				/>
				<div className={styles.dashboard__best}>
					<HeadTitle
						mode={mode}
						title="Хиты продаж"
						isSubtitle
						classNames={styles.dashboard__subtitle}
					/>
					<DashBoardSlider loading={loading} items={bestsellers} />
				</div>

				<div className={styles.dashboard__fresh}>
					<HeadTitle
						mode={mode}
						isSubtitle
						title="Новинки"
						classNames={styles.dashboard__subtitle}
					/>
					<DashBoardSlider loading={loading} items={newParts} />
				</div>
				<div
					className={cl(styles.dashboard__info, {
						[styles.dark_mode]: mode === 'dark',
					})}
				>
					<HeadTitle
						mode={mode}
						isSubtitle
						title="О компании"
						classNames={styles.dashboard__subtitle}
					/>
					<div
						className={cl(styles.dashboard__info_text, {
							[styles.dark_mode]: mode === 'dark',
						})}
					>
						Инструкции и схемы помогут разобраться в эксплуатации, определить
						неисправность и правильно выбрать запчасть для ремонта Вашего
						газового оборудования. Купить запчасть, деталь для ремонта газового
						котла возможно в любом населенном пункте Российской Федерации:
						Осуществляем доставку запчасти к газовым котлам в следующие города:
						Москва, Сан
					</div>
				</div>
			</div>
		</section>
	)
}

export default DashBoardPage
