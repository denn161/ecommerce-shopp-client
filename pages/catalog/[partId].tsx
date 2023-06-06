import { useStore } from 'effector-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Custom404 from '../404'

import { getBoilerPartFx } from '@/app/api/boiler-parts'
import Layout from '@/components/layout/layout'
import Breadcrumbs from '@/components/modules/BradCrumbs/BradCrumbs'
import { ProductPage } from '@/components/screens/ProductPage'
import { $boilerPart, setBoilerPart } from '@/context/boiler-part'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import { IQueryParams } from '@/types/catalog'

const Product = ({ query }: { query: IQueryParams }) => {
	const { isShowPage } = useProtectedRoute()
	const boilerPart = useStore($boilerPart)
	const [error, setError] = useState(false)

	const router = useRouter()

	const getDefaultTextGenerator = useCallback(
		(subpath: string) => subpath.replace('catalog', 'Каталог'),
		[]
	)
	const getTextGenerator = useCallback((param: string) => ({}[param]), [])
	const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

	useEffect(() => {
		if (lastCrumb) {
			lastCrumb.textContent = boilerPart.name
		}
	}, [lastCrumb, boilerPart])

	const loadBoilerPart = async () => {
		try {
			const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)
			if (!data) {
				setError(true)
				return
			}
			setBoilerPart(data)
		} catch (error) {
			toast.error((error as Error).message)
		} finally {
		}
	}

	useEffect(() => {
		loadBoilerPart()
	}, [router.asPath])

	return (
		<>
			<Head>
				<title>{isShowPage ? boilerPart.name : 'Аква термикс'}</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="description" content="Магазин по продаже аква запчастей" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{error ? (
				<Custom404 />
			) : (
				isShowPage && (
					<Layout>
						<main>
							<Breadcrumbs
								getDefaultTextGenerator={getDefaultTextGenerator}
								getTextGenerator={getTextGenerator}
							/>
							<div className="overlay"></div>
							<ProductPage />
						</main>
					</Layout>
				)
			)}
		</>
	)
}

export async function getServerSideProps(context: { query: IQueryParams }) {
	return {
		props: { query: { ...context.query } },
	}
}

export default Product
