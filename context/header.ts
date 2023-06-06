import { createDomain } from 'effector-next'

const header = createDomain()

export const setHeaderZindex = header.createEvent<number>()

export const $searchInputZindex = header
	.createStore<number>(1)
	.on(setHeaderZindex, (_, index) => index)
