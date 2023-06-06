import cl from 'classnames'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import styles from './BrandsSlider.module.scss'
import NextArrow from './arrow/NextArrow'
import PrevArrow from './arrow/PrevArrow'
import { brandItems } from '@/components/screens/DashBoard/data'
import { $mode } from '@/context/mode'
import useWindowWidth from '@/hooks/useMediaQuery'

const BrandsSlider = () => {
	const mode = useStore($mode)
	const { isMedia } = useWindowWidth(768)
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToScroll: 1,
		variableWidth: true,
		autoplay: true,
		nextArrow: <NextArrow modeClass={mode} />,
		prevArrow: <PrevArrow modeClass={mode} />,
	}

	useEffect(() => {
		const slider = document.querySelector('.slider')
		const list = slider?.querySelector('.slick-list') as HTMLElement
		if (list) {
			list.style.height = isMedia ? '60px' : '80px'
		}
	}, [isMedia])
	return (
		<Slider {...settings} className={styles.slider}>
			{brandItems.map((item) => (
				<div
					style={{ width: isMedia ? 124 : 180 }}
					className={cl(styles.brands__slide, {
						[styles.dark_mode]: mode === 'dark',
					})}
					key={item.id}
				>
					<img src={item.src} alt={item.alt} />
				</div>
			))}
		</Slider>
	)
}

export default BrandsSlider
