import useWindowWidth from '@/hooks/useMediaQuery'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './ProductPage.module.scss'

const ProductSlider = ({items}:{items:string[]}) => {
   const {isMedia:isMedia700}=useWindowWidth(700) 
	 const {isMedia:isMedia530}=useWindowWidth(530) 
	 
	 const settings = {
		dots: false,
		arrows:false,
		infinite: true,
		speed: 500,
		slidesToScroll:1,
		variableWidth: true,
		autoplay:true
	 }	


	return (
		<Slider {...settings} className={styles.podutc__top_slider}>
      {items.map((src,i)=>
			 <div
			  key={i} 
			 className={styles.product__top_slider_img}
			  style={{width:isMedia530?228:isMedia700?350:593}}
			 >
				 <img src={src} alt={`image${i+1}`}/>
			 </div>
			)}

		</Slider>
	)
}

export default ProductSlider