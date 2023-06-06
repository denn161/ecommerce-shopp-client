import Link from 'next/link'


import styles from '../Footer.module.scss'

const CompanyList = () => (
	<ul className={styles.footer__top_list}>
		<li className={styles.footer__top_list_item}>
			<Link href={'about'}>О компании</Link>
		</li>
		<li className={styles.footer__top_list_item}>
			<Link href={'/contacts'}>Обратная связь</Link>
		</li>
		<li className={styles.footer__top_list_item}>
			<Link href={'/'}>Оптовым покупателям</Link>
		</li>
		<li className={styles.footer__top_list_item}>
			<Link href={'/contacts'}>Контакты</Link>
		</li>
	</ul>
)

export default CompanyList
