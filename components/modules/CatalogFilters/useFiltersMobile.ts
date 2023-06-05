import { useStore } from 'effector-react'
import { useState } from 'react'

import {
	$boillerManufacturers,
	$partsManufacturers,
	
} from '@/context/boiler-parts'

const useFiltersMobile = () => {

	const [openBoilers, setOpenBoilers] = useState(false)
	const [openParts, setOpenParts] = useState(false)

	const handleOpenBoilerPopup = () => setOpenBoilers(true)
	const handleCloseBoilerPopup = () => setOpenBoilers(false)
	const handleOpenPartsPopup = () => setOpenParts(true)
	const handleClosePartsPopup = () => setOpenParts(false)

	const boilerManufacturers = useStore($boillerManufacturers)
	const partsManufacturer = useStore($partsManufacturers)

	const isBoilerChecked = boilerManufacturers.some((item) => item.checked)
	const isPartsChecked = partsManufacturer.some((item) => item.checked)

	return {
		openBoilers,
		openParts,
		handleCloseBoilerPopup,
		handleOpenBoilerPopup,
		handleClosePartsPopup,
		handleOpenPartsPopup,
		isBoilerChecked,
		isPartsChecked,
		boilerManufacturers,
		partsManufacturer
	}
}

export default useFiltersMobile
