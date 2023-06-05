import { controlStyles, menuStyles, selectStyles } from '.'
import { useStore } from 'effector-react'
import Select from 'react-select'

import { useSelect } from './useSelect'
import { optionStyles } from '@/components/elements/search-input'
import { $mode } from '@/context/mode'
import { categoriesSelect, createSelectOption } from '@/utils/common'
 
interface IManufacturerSelect{
	 setLoading:(arg:boolean)=>void
}

const ManufacturerSelect = ({setLoading}:IManufacturerSelect) => {
	const { category, handleFilter } = useSelect(setLoading)
	const mode = useStore($mode)

	return (
		<Select
			value={category || createSelectOption('Сначала дешевые')}
			onChange={handleFilter}
			styles={{
				...selectStyles,
				control: (defaultStyles) => ({
					...controlStyles(defaultStyles, mode),
				}),
				input: (defaultValues) => ({
					...defaultValues,
					color: mode === 'dark' ? '#f2f2f2' : '#222222',
					fontSize: '20px',
				}),
				menu: (defaultValues) => ({
					...menuStyles(defaultValues, mode),
				}),
				option: (defaultValues, state) => ({
					...optionStyles(defaultValues, state, mode),
				}),
			}}
			options={categoriesSelect}
			isSearchable={false}
		/>
	)
}

export default ManufacturerSelect
