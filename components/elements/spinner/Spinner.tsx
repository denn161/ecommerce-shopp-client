import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'

interface ISpinner {
	isHeader?: boolean
}

const Spinner = ({ isHeader }: ISpinner) => {
	const theme = useStore($mode)

	const modeClass = theme === 'dark' || isHeader ? 'text-light' : 'text-dark'

	return (
		<div className={`spinner-border ${modeClass}`} role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	)
}

export default Spinner
