import cl from 'classnames'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'

import Spinner from '../spinner/Spinner'

import styles from './CityButton.module.scss'
import LocationSvg from './svg/LocationSvg'
import { getLocationUserFx } from '@/app/api/city'
import { $mode } from '@/context/mode'
import { $userCity, setUserCity } from '@/context/user'

const CityButton = () => {
	const mode = useStore($mode)
	const { city } = useStore($userCity)
	const spinner = useStore(getLocationUserFx.pending)

	const getCity = async () => {
		const options = {
			timeout: 5000,
			maximiumAge: 0,
			enableHighAccuracy: true, //высокая точность
		}
		const success = async (pos: GeolocationPosition) => {
			try {
				const { latitude, longitude } = pos.coords

				const data = await getLocationUserFx({ latitude, longitude })
				setUserCity({
					city: data.features[0].properties.city,
					street: data.features[0].properties.address_line2,
				})
			} catch (error) {
				toast.error((error as Error).message)
			}
		}

		const errorCb = async (err: GeolocationPositionError) =>
			toast.error(`${err.code},${err.message}`)

		navigator.geolocation.getCurrentPosition(success, errorCb, options)
	}

	return (
		<button
			onClick={getCity}
			className={cl(styles.btn, {
				[styles.dark_mode]: mode === 'dark',
			})}
		>
			{spinner ? <Spinner isHeader /> : <LocationSvg />}
			<span>{city ? city : 'Ваш город'}</span>
		</button>
	)
}

export default CityButton
