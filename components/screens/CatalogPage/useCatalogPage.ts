import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { getBoilerPartsFx } from '@/app/api/boiler-parts'
import {
	$boillerManufacturers,
	$boillerParts,
	$filteredBoilerParts,
	$partsManufacturers,
	setBoilerParts,
	setBoilersManufacturers,
	setBoilersManufacturersFromQuery,
	setPartsManufacturers,
	setPartsManufacturersFromQuery,
} from '@/context/boiler-parts'
import { IBoilerParts } from '@/types/boiler-parts'
import { IQueryParams } from '@/types/catalog'

import {checkQueryParams, updateParamsAndFilters, updateParamsAndFiltersFromQuery } from '@/utils/catalog'

export const useCatalogPage = (query: IQueryParams) => {
	const isValidOffset = useMemo(
		() => query?.offset && !isNaN(+query.offset) && +query.offset > 0,

		[query]
	)

	const [isFilterInQuery, setIsFilterInQuery] = useState(false)

	const [isPriceRange, setIsPriceRange] = useState(false)

	const [loading, setLoading] = useState(false)

	const [spinner, setSpinner] = useState(false)

	const [priceRange, setPriceRange] = useState([1000, 9000])

	const [currentPage, setCurrentPage] = useState(
		isValidOffset ? +query?.offset - 1 : 0
	)

	const boilerParts = useStore($boillerParts)

	const filteredBoilerParts = useStore($filteredBoilerParts)

	const pageCount = Math.ceil(boilerParts.count / 20) || 10

	const router = useRouter()

	const boilerManufacturers = useStore($boillerManufacturers)
	const partsManufacturer = useStore($partsManufacturers)

	const boilerValues = boilerManufacturers.filter((item) => item.checked)
	const partsValues = partsManufacturer.filter((item) => item.checked)

	const isBoilerManufacturerChecked = useMemo(
		() => boilerManufacturers.some((item) => item.checked),
		[boilerManufacturers]
	)

	const isPartsManufacturersChecked = useMemo(
		() => partsManufacturer.some((item) => item.checked),
		[partsManufacturer]
	)

	const isDisabled = !(
		isPriceRange ||
		isBoilerManufacturerChecked ||
		isPartsManufacturersChecked
	)

	const resetPagination = (data: IBoilerParts) => {
		setCurrentPage(0)
		setBoilerParts(data)
	}

	const resetFilters = async () => {
		setLoading(true)
		try {
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)
			const params = router.query
			delete params.boilers
			delete params.parts
			delete params.priceTo
			delete params.priceFrom
			params.param = 'cheap'
			router.push({ query: { ...params } }, undefined, { shallow: true })

			setBoilersManufacturers(
				boilerManufacturers.map((item) => ({
					...item,
					checked: false,
				}))
			)
			setPartsManufacturers(
				partsManufacturer.map((item) => ({
					...item,
					checked: false,
				}))
			)
			setBoilerParts(data)
			setPriceRange([1000, 9000])
			setIsPriceRange(false)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setLoading(false)
		}
	}

	const applyFilters = async () => {
		setIsFilterInQuery(true)
		try {
			setSpinner(true)
			const priceTo = Math.ceil(priceRange[1])
			const priceFrom = Math.ceil(priceRange[0])
			const priceQuery = isPriceRange
				? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
				: ''
			const boilers = boilerManufacturers
				.filter((item) => item.checked)
				.map((item) => item.title)
			const parts = partsManufacturer
				.filter((item) => item.checked)
				.map((item) => item.title)
			console.log(boilers, parts)

			const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
			const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
			const boilersQuery = `&boilers=${encodedBoilerQuery}`
			const partsQuery = `&parts=${encodedPartsQuery}`
			const initialPage = currentPage > 0 ? 1 : currentPage

			if (boilers.length && parts.length && isPriceRange) {
				updateParamsAndFilters(
					{
						boilers: encodedBoilerQuery,
						parts: encodedPartsQuery,
						priceFrom: priceFrom,
						priceTo: priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${boilersQuery}${partsQuery}`,router
				)
				return
			}

			if (isPriceRange) {
				updateParamsAndFilters(
					{
						priceFrom: priceFrom,
						priceTo: priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}`,
					router
				)
			
			}
			if (boilers.length && parts.length) {
				updateParamsAndFilters(
					{
						boilers: encodedBoilerQuery,
						parts: encodedPartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilersQuery}${partsQuery}`,
					router
				)

				return
			}
			if (boilers.length) {
				updateParamsAndFilters(
					{
						boilers: encodedBoilerQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${boilersQuery}`,
					router
				)

				
			}
			if (parts.length) {
				updateParamsAndFilters(
					{
						parts: encodedPartsQuery,
						offset: initialPage + 1,
					},
					`${initialPage}${partsQuery}`,
					router
				)
			
			}

			if (boilers.length && isPriceRange) {
				  console.log('boiler and price')
				updateParamsAndFilters(
					{
						boilers: encodedBoilerQuery,
						priceFrom: priceFrom,
						priceTo: priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${boilersQuery}`,
					router
				)
				  return
			}
			if (parts.length && isPriceRange) {
				updateParamsAndFilters(
					{
						parts: encodedPartsQuery,
						priceFrom: priceFrom,
						priceTo: priceTo,
						offset: initialPage + 1,
					},
					`${initialPage}${priceQuery}${partsQuery}`,
					router
				)
			   return
			}
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setSpinner(false), 500)
		}
	}

	const getProducts = async () => {
		setLoading(true)
		try {
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)
			if (!isValidOffset) {
				router.replace({
					query: {
						offset: 1,
					},
				})
				resetPagination(data)
				return
			}
			if (isValidOffset) {
				if (+query.offset > Math.ceil(data.count / 20)) {
					router.push(
						{
							query: {
								...query,
								offset: 1,
							},
						},
						undefined,
						{ shallow: true }
					)
					resetPagination(data)
					return
				}

				const offset = +query.offset - 1
				const result = await getBoilerPartsFx(
					`/boiler-parts?limit=20&offset=${offset}`
				)

				setCurrentPage(offset)
				setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
				return
			}

			resetPagination(isFilterInQuery ? filteredBoilerParts : data)
		} catch (error) {
			toast.error((error as Error).message)
			setLoading(false)
		} finally {
			setTimeout(() => setLoading(false), 500)
		}
	}

	const handlePageChange = async ({ selected }: { selected: number }) => {
		window.scrollTo(0, 0)
		setLoading(true)
		try {
			const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)
			if (selected > pageCount) {
				resetPagination(isFilterInQuery ? filteredBoilerParts : data)
				return
			}

			if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
				resetPagination(isFilterInQuery ? filteredBoilerParts : data)
				return
			}
       
			const {isValidBoilersValue,isValidPartsValue,isValidPriceQueryValue} =checkQueryParams(router)

			const result = await getBoilerPartsFx(
				`/boiler-parts?limit=20&offset=${selected}${
					isFilterInQuery && isValidBoilersValue
						? `&boilers=${router.query.boilers}`
						: ''
				}${
					isFilterInQuery && isValidPartsValue
						? `&parts=${router.query.parts}`
						: ''
				}${
					isFilterInQuery && isValidPriceQueryValue
						? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
						: ''
				}${
					isFilterInQuery && isValidBoilersValue&&isValidPriceQueryValue
						? `&boilers=${router.query.boilers}&parts=${router.query.parts}`
						: ''
				}${isFilterInQuery && isValidBoilersValue&&isValidPriceQueryValue ?`&boilers=${router.query.boilers}&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`:''}${isFilterInQuery && isValidPartsValue&&isValidPriceQueryValue ?`&parts=${router.query.parts}&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`:''}`
			)
			router.push(
				{
					query: {
						...router.query,
						offset: selected + 1,
					},
				},
				undefined,
				{ shallow: true }
			)
			setCurrentPage(selected)
			setBoilerParts(result)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
			setTimeout(() => setLoading(false), 500)
		}
	}

	const updatePriceFromQuery = (priceFrom:number,priceTo:number)=>{
		setIsFilterInQuery(true)
		setPriceRange([priceFrom,priceTo])
		setIsPriceRange(true)
	}

	const applyFiltersFromQuery = async () => {
		try {
			  const {isValidBoilersValue,isValidPartsValue,isValidPriceQueryValue,priceFromQueryValue,priceToQueryValue,priceQuery,boilerQuery,boilersQueryParams,partsQuery,partsQueryParams} =checkQueryParams(router)

			if (
				isValidBoilersValue &&
				isValidPartsValue &&
			  isValidPriceQueryValue
			) {
				updateParamsAndFiltersFromQuery(() => {
				  updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue)
					setBoilersManufacturersFromQuery(boilersQueryParams)
					setPartsManufacturersFromQuery(partsQueryParams)
				}, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)

				return
			}
       
			if (			
			  isValidPriceQueryValue
			) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue)		
				}, `${currentPage}${priceQuery}`)
			
			}

			if (isValidBoilersValue && isValidPartsValue) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true)
					setBoilersManufacturersFromQuery(boilersQueryParams)
					setPartsManufacturersFromQuery(partsQueryParams)
				}, `${currentPage}${boilerQuery}${partsQuery}`)

			
			}

			if (isValidBoilersValue && isValidPriceQueryValue) {
				updateParamsAndFiltersFromQuery(() => {
					updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue)
					setBoilersManufacturersFromQuery(boilersQueryParams)
				}, `${currentPage}${priceQuery}${boilerQuery}`)
				
			}

			if (
				isValidBoilersValue
			) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true)				
					setBoilersManufacturersFromQuery(boilersQueryParams)
				}, `${currentPage}${boilerQuery}`)
			
			}

			if (
			
				isValidPartsValue 
			) {
				updateParamsAndFiltersFromQuery(() => {
					setIsFilterInQuery(true)			
					setPartsManufacturersFromQuery(partsQueryParams)
				}, `${currentPage}${partsQuery}`)

				
			}

		} catch (error) {
			const err = error as Error 

			if(err.message==='URI malformed'){
				toast.warning('Не правильная ссылка для фильтров')
				 return
			}
			toast.error(err.message)
		}
	}
	useEffect(() => {
		applyFiltersFromQuery()
	}, [])

	useEffect(() => {
		getProducts()
	}, [filteredBoilerParts, isFilterInQuery])

	return {
		loading,
		boilerParts,
		currentPage,
		pageCount,
		handlePageChange,
		priceRange,
		setPriceRange,
		boilerValues,
		partsValues,
		isDisabled,
		resetFilters,
		isBoilerManufacturerChecked,
		isPartsManufacturersChecked,
		isPriceRange,
		setIsPriceRange,
		applyFilters,
		setIsFilterInQuery,
		setLoading,
		spinner,
	}
}
