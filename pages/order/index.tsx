import Head from 'next/head'
import { useCallback } from 'react'

import Layout from '@/components/layout/layout'
import Breadcrumbs from '@/components/modules/BradCrumbs/BradCrumbs'
import { Order } from '@/components/screens/Order'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

function OrderPage() {
	const { isShowPage } = useProtectedRoute()
	const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])
	const getTextGenerator = useCallback((param: string) => ({}[param]), [])

	return (
		<>
			<Head>
				<title>{isShowPage ? 'Орфмление заказа' : 'Аква термикс'}</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="description" content="Магазин по продаже аква запчастей" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{isShowPage && (
				<Layout>
					<main>
						<Breadcrumbs
							getDefaultTextGenerator={getDefaultTextGenerator}
							getTextGenerator={getTextGenerator}
						/>
						<div className="overlay"></div>
						<Order />
					</main>
				</Layout>
			)}
		</>
	)
}

export default OrderPage
