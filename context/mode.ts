import { createDomain } from 'effector-next'

const mode = createDomain()

export const setMode = mode.createEvent<'dark' | 'light'>()

export const $mode = mode
	.createStore<'dark' | 'light'>('light')
	.on(setMode, (_, mode) => mode)
