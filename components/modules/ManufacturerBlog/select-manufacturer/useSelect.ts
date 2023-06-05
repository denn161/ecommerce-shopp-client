import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
	$boillerParts,
	setBoilerPartsByPopularity,
	setBoilerPartsCheapFirst,
	setBoilerPartsExpensiveFirst,
} from '@/context/boiler-parts'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { useStore } from 'effector-react'

export const useSelect = (setLoading:(arg:boolean)=>void) => {

	const [category, setCategory] = useState<SelectOptionType>(null)
  
	const boilerParts = useStore($boillerParts)
	const router = useRouter()

	const updateQueryParam = (param: string) =>
		router.push(
			{
				query: {
					...router.query,
					param,
				},
			},
			undefined,
			{ shallow: true }
		)
	const handleFilter = (selectedOption: SelectOptionType) => {
		setLoading(true)
		setCategory(selectedOption)		
		switch ((selectedOption as IOption).value) {
			case 'Сначала дешевые':			
				setBoilerPartsCheapFirst()
				updateQueryParam('cheap')
			
				break
			case 'По популярности':
				
				setBoilerPartsByPopularity()
				updateQueryParam('popular')	
				
				break
			case 'Сначала дорогие':			
				setBoilerPartsExpensiveFirst()
				updateQueryParam('expensive')				
				break
		}

		setTimeout(() => setLoading(false), 500)
	}

	useEffect(() => {
    if(boilerParts.rows){
			switch (router.query.param) {
				case 'cheap':
					setBoilerPartsCheapFirst()
					setCategory(createSelectOption('Сначала дешевые'))
					break
				case 'popular':
					setBoilerPartsByPopularity()
					setCategory(createSelectOption('По популярности'))
					break
				case 'expensive':
					setBoilerPartsExpensiveFirst()
					setCategory(createSelectOption('Сначала дорогие'))
					break
				default:
					setBoilerPartsCheapFirst()
					setCategory(createSelectOption('Сначала дешевые'))
					break
			}
		}
		
	}, [router.query.param,boilerParts.rows])

	return { category, handleFilter }
}
