import styles from './ProductPage.module.scss'

interface IProductImg {
	src: string
	cb: (arg: string) => void
	alt: string
}
const ProductImgItem = ({ src, cb, alt }: IProductImg) => {
	const setCurrentImg = () => cb(src)

	return (
		<li className={styles.product__top_images_item} onClick={setCurrentImg}>
			<img src={src} alt={alt} />
		</li>
	)
}

export default ProductImgItem
