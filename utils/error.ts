import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { HTTPStatus } from '@/constants'

export const showAuthError = (error: unknown) => {
	const err = error as AxiosError

	if (err.response) {
		if (err.response.status === HTTPStatus.UNAUTHORIZED) {
			toast.error('Неверное имя или пароль')
			return
		}
		if (err.response.status === HTTPStatus.FORBIDDEN) {
			toast.error('Вы не зарегестрированы.Войдите в систему')
			return
		}
	}

	toast.error((error as Error).message)
}
