import { MultiValue, SingleValue } from 'react-select'

export interface IComponentProfile {
	open: boolean
	setOpen: (arg: boolean) => void
}

export interface IOption {
	value: string | number
	label: string | number
}

export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null

export interface IGeolocation {
	latitude: number
	longitude: number
}
