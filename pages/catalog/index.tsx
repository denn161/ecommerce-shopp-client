import Head from 'next/head'
import { useCallback } from 'react'

import Layout from '@/components/layout/layout'
import Breadcrumbs from '@/components/modules/BradCrumbs/BradCrumbs'
import { CatalogPage } from '@/components/screens/CatalogPage'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import { IQueryParams } from '@/types/catalog'

function Catalog({ query }: { query: IQueryParams }) {
	const { isShowPage } = useProtectedRoute()
	const getDefaultTextGenerator = useCallback(() => 'Каталог', [])

	const getTextGenerator = useCallback((param: string) => ({}[param]), [])

	return (
		<>
			<Head>
				<title>{isShowPage ? 'Каталог' : 'Аква термикс'}</title>
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
						<CatalogPage query={query} />
					</main>
				</Layout>
			)}
		</>
	)
}

export async function getServerSideProps(context: { query: IQueryParams }) {
	return {
		props: { query: { ...context.query } },
	}
}

export default Catalog
