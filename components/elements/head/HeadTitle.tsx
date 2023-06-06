import cl from 'classnames'

import styles from './HeadTitle.module.scss'

const HeadTitle = ({
	title,
	classNames,
	mode,
	isSubtitle,
}: {
	title: string
	classNames?: string
	mode?: string
	isSubtitle?: boolean
}) => {
	return (
		<div className={cl(styles.head__wrapper)}>
			<h2
				className={cl(styles.title, classNames, {
					[styles.dark_mode]: mode === 'dark',
					[styles.subtitle]: isSubtitle,
				})}
			>
				{title}
			</h2>
		</div>
	)
}

export default HeadTitle
