import { useState } from 'react'

export const useAccardion = () => {
	const [expandet, setExpandet] = useState(false)

	const handleToggleAccordion = () => {
		setExpandet((prev) => !prev)
	}

	return { expandet, handleToggleAccordion }
}
