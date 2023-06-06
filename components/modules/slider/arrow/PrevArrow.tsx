import cl from 'classnames'

import { CustomArrowProps } from 'react-slick'

import styles from '../BrandsSlider.module.scss'

import ArrowSliderSvg from './ArrowSliderSvg'

export interface IBrandsSliderArrow extends CustomArrowProps {
	modeClass: string
}
const PrevArrow = (props: IBrandsSliderArrow) => (
	<button
		onClick={props.onClick}
		className={cl(styles.slider__arrow, styles.slider__arrow_prev, {
			[styles.dark_mode]: props.modeClass === 'dark',
		})}
	>
		<ArrowSliderSvg />
	</button>
)

export default PrevArrow
