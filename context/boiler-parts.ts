import { createDomain } from 'effector-next'

import { IBoilerPart, IBoilerParts } from '@/types/boiler-parts'
import { ICheckedFilterItem } from '@/types/catalog'
import { boilerManufacturers, partsManufacturers } from '@/utils/catalog'

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()
export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularity = boilerParts.createEvent()
export const setBoilersManufacturers =
	boilerParts.createEvent<ICheckedFilterItem[]>()
export const setPartsManufacturers =
	boilerParts.createEvent<ICheckedFilterItem[]>()

export const updateBoilerManufacturer =
	boilerParts.createEvent<ICheckedFilterItem>()
export const updatePartsManufacturer =
	boilerParts.createEvent<ICheckedFilterItem>()

export const setFilteredBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilersManufacturersFromQuery =
	boilerParts.createEvent<string[]>()

export const setPartsManufacturersFromQuery =
	boilerParts.createEvent<string[]>()

const updateManufacturer = (
	manufacturerList: ICheckedFilterItem[],
	id: string,
	payload: Partial<ICheckedFilterItem>
) => {
	return manufacturerList.map((item) => {
		if (item.id === id) {
			return {
				...item,
				...payload,
			}
		}
		return item
	})
}

const updateManufacturerFromQuery = (
	manufacturerList: ICheckedFilterItem[],
	manufacturer: string[]
) => {
	return manufacturerList.map((item) => {
		if (manufacturer.find((title) => title === item.title)) {
			return {
				...item,
				checked: true,
			}
		}
		return item
	})
}

export const $boillerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setBoilerParts, (_, parts) => parts)
	.on(setBoilerPartsCheapFirst, (state) => ({
		...state,
		rows: state.rows.sort((a, b) => a.price - b.price),
	}))
	.on(setBoilerPartsExpensiveFirst, (state) => ({
		...state,
		rows: state.rows.sort((a, b) => b.price - a.price),
	}))
	.on(setBoilerPartsByPopularity, (state) => ({
		...state,
		rows: state.rows.sort((a, b) => a.popularity - b.popularity),
	}))

export const $boillerManufacturers = boilerParts
	.createStore<Array<ICheckedFilterItem>>(
		boilerManufacturers as Array<ICheckedFilterItem>
	)
	.on(setBoilersManufacturers, (_, parts) => parts)
	.on(updateBoilerManufacturer, (state, payload) => [
		...updateManufacturer(state, payload.id as string, {
			checked: payload.checked,
		}),
	])
	.on(setBoilersManufacturersFromQuery, (state, manufacturer) => [
		...updateManufacturerFromQuery(state, manufacturer),
	])

export const $partsManufacturers = boilerParts
	.createStore<Array<ICheckedFilterItem>>(
		partsManufacturers as Array<ICheckedFilterItem>
	)
	.on(setPartsManufacturers, (_, parts) => parts)
	.on(updatePartsManufacturer, (state, payload) => [
		...updateManufacturer(state, payload.id as string, {
			checked: payload.checked,
		}),
	])
	.on(setPartsManufacturersFromQuery, (state, manufacturer) => [
		...updateManufacturerFromQuery(state, manufacturer),
	])

export const $filteredBoilerParts = boilerParts
	.createStore<IBoilerParts>({} as IBoilerParts)
	.on(setFilteredBoilerParts, (_, parts) => parts)
