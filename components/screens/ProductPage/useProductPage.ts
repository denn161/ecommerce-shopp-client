import { getBoilerPartsFx } from '@/app/api/boiler-parts'
import { $boilerPart } from '@/context/boiler-part'
import { $boillerParts, setBoilerParts, setBoilerPartsByPopularity } from '@/context/boiler-parts'
import { $mode } from '@/context/mode'
import useWindowWidth from '@/hooks/useMediaQuery'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


export const useProductPage = ()=>{
 
	const [loading, setLoading] = useState(false)
	const mode = useStore($mode)
	const { isMedia: isMobile850 } = useWindowWidth(850)
	const boilerPart = useStore($boilerPart)
	const parts = useStore($boillerParts)	

	

	const loadProducts = async () => {
		try {
			setLoading(true)
			const data = await getBoilerPartsFx('/boiler-parts?limit=20&&offset=0')
			setBoilerParts(data)
			setBoilerPartsByPopularity()
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setLoading(false), 500)
		}
	}

	useEffect(() => {
		loadProducts()
	}, []) 


	return {loading,mode,boilerPart,isMobile850,parts}

}