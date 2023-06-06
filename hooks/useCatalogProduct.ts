import { useStore } from 'effector-react'
import { useState } from 'react'

import { $shoppingCard } from '@/context/shopping-card'
import { $user } from '@/context/user'
import { IBoilerPart } from '@/types/boiler-parts'
import { toggleCartItem } from '@/utils/shopping-cart'

const useCatalogProduct = ({
	item,
	mode,
}: {
	item: IBoilerPart
	mode: string
}) => {
	const [spinner, setSpinner] = useState(false)

	const shoppingCard = useStore($shoppingCard)

	const user = useStore($user)
	const isChecked = shoppingCard.some((product) => product.partId === item.id)

	const modeClass = mode === 'dark' ? 'text-light' : 'text-dark'

	const toggleCart = () =>
		toggleCartItem(user.username, item.id, isChecked, setSpinner)

	return {
		spinner,
		isChecked,
		modeClass,
		toggleCart,
	}
}

export default useCatalogProduct
