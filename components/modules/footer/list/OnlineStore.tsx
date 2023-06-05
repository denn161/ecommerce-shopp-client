import Link from 'next/link'
import React from 'react'
import styles from '../Footer.module.scss'
const OnlineStore = () => (
	<ul className={styles.footer__top_list}>
	<li className={styles.footer__top_list_item}>
	<Link href={'/'}>Каталог</Link>							
	</li>
	<li className={styles.footer__top_list_item}>
	<Link href={'/'}>Доставка и оплата</Link>
	</li>
</ul>
)

export default OnlineStore