import Link from 'next/link'

import styles from './Footer.module.scss'
import LogoSvg from './img/LogoSvg'

const FooterLogo = () => (
	<div className={styles.footer__top_item}>
		<Link href={'/dashboard'}>
			<LogoSvg />
			<span>Детали для газовых котлов</span>
		</Link>
	</div>
)

export default FooterLogo
