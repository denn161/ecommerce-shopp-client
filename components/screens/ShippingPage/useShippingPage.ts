import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
export const useShippingPage = ()=>{
	const [tab1, setTab1] = useState(true)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [tab4, setTab4] = useState(false)

   const mode =useStore($mode) 

	 const handleTab1 = () => {
    setTab1(true)
    setTab2(false)
    setTab3(false)
    setTab4(false)
  }

  const handleTab2 = () => {
    setTab1(false)
    setTab2(true)
    setTab3(false)
    setTab4(false)
  }

  const handleTab3 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(true)
    setTab4(false)
  }

  const handleTab4 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(false)
    setTab4(true)
  }

	 const tabs =[
		{ 
			id:uuidv4(),
			title:'Как работает курьерская доставка?',
			onClick:handleTab1

		},
		{ 
		 id:uuidv4(),
		 title:'Как получить товар из пункта самовывоза?',
		 onClick:handleTab2


	 },
	 { 
		 id:uuidv4(),
		 title:'Какие способы оплаты?',
		 onClick:handleTab3


	 },
	 { 
		 id:uuidv4(),
		 title:'Как узнать статус заказанного товара?',
		 onClick:handleTab4


	 } 
] 

const isTabs = [tab1,tab2,tab3,tab4] 



 


	return {isTabs,tabs,mode}

}