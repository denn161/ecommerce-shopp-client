import Head from 'next/head'

import AuthPage from '@/components/screens/AuthPage/AuthPage'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'

function Auth() {
	const { isShowPage } = useProtectedRoute(true)

	return (
		<>
			<Head>
				<title>{isShowPage ? 'Авторизация' : 'Аква термикс'}</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
				<meta name="description" content="Магазин по продаже аква запчастей" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
			</Head>
			{isShowPage && <AuthPage />}
		</>
	)
}

export default Auth
