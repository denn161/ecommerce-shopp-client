import { NextRouter } from 'next/router'

export const getWindowWidth = () => {
	const { innerWidth: windowWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 }
	return { windowWidth }
}

export const formatPrice = (x: number) =>
	x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export function sklonenie(num: number, words: string[]) {
	const cases = [2, 0, 1, 1, 1, 2]
	return `${
		words[
			num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
		]
	}`
}

export const createSelectOption = (value: string | number) => ({
	value,
	label: value,
})

export const categoriesSelect = [
	'Сначала дешевые',
	'По популярности',
	'Сначала дорогие',
].map(createSelectOption)

export const getQueryParamsOnFirstRender = (
	queryName: string,
	router: NextRouter
) => {
	return (
		router.query[queryName] ||
		router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))
	)
}

export const toggleClassNamesForOverlayAndBody = (activeClassName='open')=>{
	document.querySelector('.overlay')?.classList.toggle(activeClassName)
	document.body.classList.add('overflow-hidden')


}

export const removeClassNameForOverlayAndBody =(activeClassName='open')=>{
	document.querySelector('.overlay')?.classList.remove(activeClassName)
	document.querySelector('.overlay')?.classList.remove('open-search')
	document.body.classList.remove('overflow-hidden')

}

