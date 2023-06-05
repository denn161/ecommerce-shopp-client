import React from 'react'
import ArrowSliderSvg from './ArrowSliderSvg'
import styles from '../BrandsSlider.module.scss'
import cl from 'classnames'

import { CustomArrowProps } from 'react-slick'

export interface IBrandsSliderArrow extends CustomArrowProps {
  modeClass: string
}
const NextArrow = (props:IBrandsSliderArrow) => (
	 <button onClick={props.onClick} className={cl(styles.slider__arrow,styles.slider__arrow_next,{
		[styles.dark_mode]:props.modeClass==='dark'
	 })}>
		<ArrowSliderSvg/>
	 </button>
)

export default NextArrow