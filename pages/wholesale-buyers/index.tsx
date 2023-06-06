import Head from 'next/head'
import { useCallback } from 'react'

import Layout from '@/components/layout/layout'
import Breadcrumbs from '@/components/modules/BradCrumbs/BradCrumbs'
import { WholesalePage } from '@/components/screens/WholesalePage'

const Wholesale = () => {
	const getDefaultTextGenerator = useCallback(() => 'Оптовым покупателям', [])
	const getTextGenerator = useCallback((param: string) => ({}[param]), [])
	return (
		<>
			<Head>
				<title>{'Оптовым покупателям'}</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="description" content="Магазин по продаже аква запчастей" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			<Layout>
				<main>
					<Breadcrumbs
						getDefaultTextGenerator={getDefaultTextGenerator}
						getTextGenerator={getTextGenerator}
					/>
					<div className="overlay"></div>
					<WholesalePage />
				</main>
			</Layout>
		</>
	)
}

export default Wholesale
