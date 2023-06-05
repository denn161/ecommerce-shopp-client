
import Skeleton from '@/components/elements/skeleton/Skeleton'
import { $mode } from '@/context/mode'
import useWindowWidth from '@/hooks/useMediaQuery'
import { IBoilerPart } from '@/types/boiler-parts'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'
import Slider from 'react-slick'
import ProductCard from '../product-item/ProductCard'
import styles from './BrandsSlider.module.scss'

interface IDashBoardSlider{
	 items:IBoilerPart[],
	 loading:boolean
	 gotoPartPage?:boolean
}

const DashBoardSlider = ({items,loading,gotoPartPage}:IDashBoardSlider) => {

	const mode = useStore($mode)
	
	const {isMedia:isMedia768} =useWindowWidth(768)
	const {isMedia:isMedia1030} =useWindowWidth(1030)
	const {isMedia:isMedia1366} =useWindowWidth(1366)
	const {isMedia:isMedia560} =useWindowWidth(560)
	const {isMedia:isMedia800} =useWindowWidth(800)
  
	const styleWidthSlider ={
		width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
	 }
 const settings = {
	 dots: false,
	 arrows:false,
	 infinite: true,
	 speed: 500,
	 slidesToScroll:isMedia768?1:2,
	 variableWidth: true,
	 autoplay:true,
	 slidesToShow:1
	 };
	 

 
	return (
		 <Slider {...settings} className={styles.dashboard__slider}>
			{loading&&(Array.from({length:8}).map((_,index)=>
			  <Skeleton style={styleWidthSlider} key={index} mode={mode} loading={loading}/>
			))}
      {!!items.length&&items.map((item)=>
			 <ProductCard goTo={gotoPartPage} key={item.id} mode={mode} item={item} style={styleWidthSlider}/>
			)}
		 </Slider>
	)
}

export default DashBoardSlider