import { controlStyles, inputStyles, menuStyles, optionStyles } from '.'
import cl from 'classnames'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { MutableRefObject, useCallback, useRef, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'

import styles from '../../modules/header/Header.module.scss'

import { findProductByName, searchPartFx } from '@/app/api/boiler-parts'
import SearchSvg from '@/components/modules/header/svg/SearchSvg'
import { $searchInputZindex, setHeaderZindex } from '@/context/header'
import { $mode } from '@/context/mode'

import { IOption, SelectOptionType } from '@/types/common'
import {
	removeClassNameForOverlayAndBody,
	toggleClassNamesForOverlayAndBody,
} from '@/utils/common'
import { NoOptionsMessage, NoOptionsSpinner } from '../select/NoOptionsMessage'
import useDebounceDelay from '@/hooks/useDebounceDelay'

const SearchInput = () => {
	const [state, setState] = useState<SelectOptionType>(null)
	const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({})
	const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
	const [options, setOptions] = useState(
		Array<IOption>
	)
	const [inputValue,setInputValue]=useState('')
	const mode = useStore($mode)
	const zIndex = useStore($searchInputZindex)
	const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
	const borderRef = useRef() as MutableRefObject<HTMLSpanElement>
	const spinner = useStore(searchPartFx.pending)
  const debounceCallback=useDebounceDelay(1000)
	const router = useRouter()

	const searchProduct = async (search: string) => {
		try {
			setInputValue(search)
			const data = await searchPartFx({
				url: '/boiler-parts/search',
				search,
			})
			const names = data.rows
				.map((item) => item.name)
				.map((name) => ({ value: name, label: name }))
			setOptions(names)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}	

	const getPartAndReidirect = async (name: string) => {
		try {
			const data = await findProductByName({
				url: '/boiler-parts/name',
				name,
			})
			if(!data.id){
				toast.warning('Товра не найден')
				return
			}
			router.push(`/catalog/${data.id}`)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const handleSearch = (selectedOption: SelectOptionType) => {
		if (!selectedOption) {
			setState(null)
			return
		}
		const name = (selectedOption as IOption)?.value as string
	   if(name){
			getPartAndReidirect(name)
		 }
		setState(selectedOption)
	}

	const handleClickSearch =useCallback(()=>{
		if(!inputValue){
			 return
		}
	getPartAndReidirect(inputValue)
 },[inputValue])

	const onfocusInput = () => {
		toggleClassNamesForOverlayAndBody('open-search')
		setHeaderZindex(101)
	}

	const onSearchInputChange = (str: string) => {
		document.querySelector('.overlay')?.classList.add('open-search')
		document.body.classList.add('overflow-hidden')
    
		debounceCallback(()=>searchProduct(str))
	
	}

	const onSearchMenuOpen = () => {
		setOnMenuOpenControlStyles({
			borderBottomLeftRadius: 0,
			border: 'none',
		})

		setOnMenuOpenContainerStyles({
			boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
		})

		btnRef.current.style.border = 'none'
		btnRef.current.style.backgroundColor = '#f2f2f2'
		btnRef.current.style.zIndex = '101'
		btnRef.current.style.borderBottomRightRadius = '0'
		borderRef.current.style.display = 'block'
	}
	const onSearchMenuClose = () => {
		setOnMenuOpenControlStyles({
			borderBottomLeftRadius: 4,
			boxShadow: 'none',
			border: '1px solid #9e9e9e',
		})

		setOnMenuOpenContainerStyles({
			boxShadow: 'none',
		})

		btnRef.current.style.border = '1px solid #9e9e9e'
		btnRef.current.style.borderLeft = 'none'
		btnRef.current.style.borderBottomRightRadius = '4px'
		borderRef.current.style.display = 'none'
		removeClassNameForOverlayAndBody()
	}

	return (
		<div className={styles.header__bottom_search_inner}>
			<Select
		    components={{NoOptionsMessage:spinner ?NoOptionsSpinner:NoOptionsMessage}}
				placeholder="Я ищу..."
				value={state}
				onChange={handleSearch}
				styles={{
					...inputStyles,
					container: (defaultStyles) => ({
						...defaultStyles,
						...onMenuOpenContainerStyles,
					}),
					control: (defaultStyles) => ({
						...controlStyles(defaultStyles, mode),
						zIndex,
						transition: 'none',
						backgroundColor: mode === 'dark' ? '#2d2d2d' : '#f2f2f2',
						...onMenuOpenControlStyles,
					}),
					input: (defaultValues) => ({
						...defaultValues,
						color: mode === 'dark' ? '#f2f2f2' : '#222222',
						fontSize: '20px',
					}),
					menu: (defaultValues) => ({
						...menuStyles(defaultValues, mode),
						zIndex,
						marginTop: '-1px',
					}),
					option: (defaultValues, state) => ({
						...optionStyles(defaultValues, state, mode),
					}),
				}}
				options={options}
				isClearable={true}
				openMenuOnClick={false}
				onFocus={onfocusInput}
				onInputChange={onSearchInputChange}
				onMenuOpen={onSearchMenuOpen}
				onMenuClose={onSearchMenuClose}
			/>
			<span			
				ref={borderRef}
				className={styles.header__bottom_search_border}
			></span>
			<button
			  onClick={handleClickSearch}
				ref={btnRef}
				className={cl(styles.header__bottom_search_btn, {
					[styles.dark]: mode === 'dark',
				})}
			>
				<SearchSvg />
			</button>
		</div>
	)
}

export default SearchInput
