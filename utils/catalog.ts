import { getBoilerPartsFx } from '@/app/api/boiler-parts'
import { setFilteredBoilerParts } from '@/context/boiler-parts'
import { NextRouter } from 'next/router'
import {v4 as uuidv4} from 'uuid'
import { getQueryParamsOnFirstRender } from './common'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: uuidv4(),
})

export const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
].map(createManufacturerCheckboxObj)

export const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
].map(createManufacturerCheckboxObj)

export const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000


  export const checkQueryParams =(router:NextRouter)=>{

    const priceFromQueryValue = getQueryParamsOnFirstRender(
      'priceFrom',
      router
    ) as string
    const priceToQueryValue = getQueryParamsOnFirstRender('priceTo', router) as string

    const partsQueryParams = JSON.parse(
      decodeURIComponent(
        getQueryParamsOnFirstRender('parts', router) as string
      )
    )
    const boilersQueryParams = JSON.parse(
      decodeURIComponent(
        getQueryParamsOnFirstRender('boilers', router) as string
      )
    )
    const isValidBoilersValue =
      Array.isArray(boilersQueryParams) && !!boilersQueryParams?.length

    const isValidPartsValue =
      Array.isArray(partsQueryParams) && !!partsQueryParams?.length
      
      const isValidPriceQueryValue = checkPriceFromQuery(+priceFromQueryValue) && checkPriceFromQuery(+priceToQueryValue)

    const boilerQuery = `&boilers=${getQueryParamsOnFirstRender(
      'boilers',
      router
    )}`

    const partsQuery = `&parts=${getQueryParamsOnFirstRender(
      'parts',
      router
    )}`

    const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

    return{
       priceQuery,
       partsQuery,
       boilerQuery,
       isValidBoilersValue,
       isValidPartsValue,
       isValidPriceQueryValue,
       boilersQueryParams,
       partsQueryParams,
       priceToQueryValue,
       priceFromQueryValue
    }
  }

   export async function updateParamsAndFiltersFromQuery(
		cb: VoidFunction,
		path: string
	) {
		cb()
		const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
		setFilteredBoilerParts(data)
	}

	 export async function updateParamsAndFilters<T>(updateParams: T, path: string,router:NextRouter) {
		const params = router.query
		delete params.boilers
		delete params.parts
		delete params.priceTo
		delete params.priceFrom

		router.push(
			{
				query: {
					...params,
					...updateParams,
				},
			},
			undefined,
			{ shallow: true }
		)
		const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)
		setFilteredBoilerParts(data)
	}