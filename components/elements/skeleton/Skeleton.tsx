import cl from 'classnames'

import styles from './Skeleton.module.scss'

const Skeleton = ({
	mode,
	loading,
	style,
}: {
	mode?: string
	loading: boolean
	style: {}
}) => {
	return (
		<div
			style={style}
			className={cl(styles.card, {
				[styles.dark_mode]: mode === 'dark',
				[styles.loading]: loading,
			})}
		>
			<div
				className={cl(styles.image, {
					[styles.dark_mode]: mode === 'dark',
				})}
			></div>
			<div className={styles.content}>
				<h4></h4>
				<p></p>
			</div>
		</div>
	)
}

export default Skeleton
