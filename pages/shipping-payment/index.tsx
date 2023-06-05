
import Head from 'next/head'
import Layout from '@/components/layout/layout'
import { ShippingPage } from '@/components/screens/ShippingPage'
import { useCallback } from 'react'
import Breadcrumbs from '@/components/modules/BradCrumbs/BradCrumbs'



const ShippingPayment = () => {
	const getDefaultTextGenerator = useCallback(() => 'Доставка и оплата', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

	return (
		<>
		<Head>
			<title>{'Доставка и оплата'}</title>
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
			    <ShippingPage/>
				</main>
			</Layout>
		
	</>
	)
}

export default ShippingPayment