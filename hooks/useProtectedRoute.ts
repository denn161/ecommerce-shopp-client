import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

import { loginCheckFx } from '@/app/api/auth'
import { setUser } from '@/context/user'

export const useProtectedRoute = (isAuthPage?: boolean) => {
	const [isShowPage, setIsShowPage] = useState(false)

	const router = useRouter()

	const checkAuth = useRef(true)

	const checkUser = useCallback(async () => {
		const user = await loginCheckFx('/users/login-check')
		if (isAuthPage) {
			if (!user) {
				setIsShowPage(true)
				return
			}

			router.push('/dashboard')
			return
		}
		if (user) {
			setUser(user)
			setIsShowPage(true)
			return
		}

		router.push('/')
	}, [])
	useEffect(() => {
		if (checkAuth.current) {
			checkAuth.current = false
			checkUser()
		}
	}, [])

	return { isShowPage }
}
