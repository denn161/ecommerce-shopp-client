import React from 'react'

import styles from './Header.module.scss'
import HeaderBottom from './HeaderBottom'
import HeaderTop from './HeaderTop'

const Header = () => {
	return (
		<header className={styles.header}>
			<HeaderTop />
			<HeaderBottom />
		</header>
	)
}

export default Header
