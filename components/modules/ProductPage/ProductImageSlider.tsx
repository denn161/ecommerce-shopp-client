import { useStore } from 'effector-react'
import { useState } from 'react'

import ProductImgItem from './ProductImgItem'
import styles from './ProductPage.module.scss'
import ProductSlider from './ProductSlider'
import { $boilerPart } from '@/context/boiler-part'
import useWindowWidth from '@/hooks/useMediaQuery'

const ProductImageSlider = () => {
	const [currentImageSrs, setCurrentImageSrc] = useState('')

	const boilerPart = useStore($boilerPart)
	const { isMedia } = useWindowWidth(830)
	const images = boilerPart.images
		? (JSON.parse(boilerPart.images) as Array<string>)
		: []

	return (
		<div className={styles.product__top_images}>
			{isMedia ? (
				<ProductSlider items={images} />
			) : (
				<div className={styles.product__top_images_wrapper}>
					<div className={styles.product__top_images_img}>
						<img src={currentImageSrs || images[0]} alt="Current image" />
					</div>
					<ul className={styles.product__top_images_list}>
						{images.map((src, i) => (
							<ProductImgItem
								key={i}
								src={src}
								alt={`image${i + 1}`}
								cb={setCurrentImageSrc}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default ProductImageSlider
