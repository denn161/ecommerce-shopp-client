import cl from 'classnames'
import { useStore } from 'effector-react'

import styles from './AboutPage.module.scss'
import HeadTitle from '@/components/elements/head/HeadTitle'
import { $mode } from '@/context/mode'

interface IAboutPageProps {}

export const AboutPage = ({}: IAboutPageProps) => {
	const mode = useStore($mode)

	return (
		<section className={cl(styles.about)}>
			<div className="container">
				<HeadTitle
					mode={mode}
					classNames={styles.about__title}
					title="О компании"
				/>
				<div
					className={cl(styles.about__info, {
						[styles.dark]: mode === 'dark',
					})}
				>
				   <p>
              Компания &quot;АкваТермикс&quot; предлагает Вам запасные части для
              европейских, корейских и отечественных газовых и электрических
              котлов. 99% запчастей представленных на сайте постоянно
              поддерживаются в наличии на нашем складе.
            </p>
            <p>
              Ассортимент интернет-магазина &quot;АкваТермикс&quot; включает в
              себя запасные части для котлов Arderia, Ariston, Baxi, Beretta,
              Bosch, Buderus, Chaffoteaux, De Dietrich, Demrad, Electrolux,
              Ferroli, Fondital, Immergas, Junkers, Koreastar, Nova Florida,
              Saunier Duval, Sime, Tiberis, Vaillant, Viessmann, Westen.
            </p>
				</div>
				 <img className={styles.about__img1} src='/img/about-1.png'/>
				 <img className={styles.about__img2} src='/img/about-2.png'/>
			</div>
		</section>
	)
}
