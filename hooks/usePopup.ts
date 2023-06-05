import { setHeaderZindex } from '@/context/header'
import { removeClassNameForOverlayAndBody, toggleClassNamesForOverlayAndBody } from '@/utils/common'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

export const usePopup = () => {
	const [open, setOpen] = useState(false)
	const btnRef = useRef() as MutableRefObject<any>

	const handleToggleOpen = () => {
		window.scrollTo(0, 0)
	  toggleClassNamesForOverlayAndBody()
	  if(btnRef.current){
			btnRef.current.classList.toggle('active')
			btnRef.current.classList.toggle('show')
		
		}

		setOpen((prev)=>!prev)     
	  	
	}

	const closePopup = () => {
	  removeClassNameForOverlayAndBody()
		if(btnRef.current){
			btnRef.current.classList.remove('active')
		  btnRef.current.classList.remove('show')
		}
		setOpen(false)
		setHeaderZindex(1)
	}

	useEffect(() => {
		const overlay = document.querySelector('.overlay')
		overlay?.addEventListener('click', closePopup, true)
		return () => {
			overlay?.removeEventListener('click', closePopup, true)
		}
	}, [open])

	return { open, handleToggleOpen, closePopup, btnRef }
}
