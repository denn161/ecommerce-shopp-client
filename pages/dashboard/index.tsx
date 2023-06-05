import Head from 'next/head'

import Layout from '@/components/layout/layout'
import DashBoardPage from '@/components/screens/DashBoard/DashBoardPage'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import Breadcrumbs from '@/components/modules/BradCrumbs/BradCrumbs'

function DashboardPage() {
	const { isShowPage } = useProtectedRoute() 

	const getDefaultTextGenerator = ()=>''

 
  const getTextGenerator = ()=>''
	return (
		<>
			<Head>
				<title>{isShowPage ? 'Главная' : 'Аква термикс'}</title>
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
						<DashBoardPage />
					</main>
				</Layout>
			)}
		</>
	)
}

export default DashboardPage
