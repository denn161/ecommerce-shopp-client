import { useState } from 'react'

export const useCatalogFilters = () => {
	const [loading, setLoading] = useState(false)

	return { loading }
}
