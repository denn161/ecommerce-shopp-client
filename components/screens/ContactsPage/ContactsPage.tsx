import cl from 'classnames'
import { useStore } from 'effector-react'

import ContactsForm from '../../modules/FeadBackForm/ContactsForm'

import styles from './ContactsPage.module.scss'
import { contacts } from './data'
import HeadTitle from '@/components/elements/head/HeadTitle'
import { $mode } from '@/context/mode'

interface IContactsPageProps {}

export const ContactsPage = ({}: IContactsPageProps) => {
	const mode = useStore($mode)

	return (
		<section className={cl(styles.contacts)}>
			<div className="container">
				<HeadTitle
					title="Контакты"
					mode={mode}
					classNames={styles.contacts__title}
				/>
				<div className={styles.contacts__inner}>
					<div
						className={cl(styles.contacts__info, {
							[styles.dark]: mode === 'dark',
						})}
					>
						<h3
							className={cl(styles.contacts__info_title, {
								[styles.dark]: mode === 'dark',
							})}
						>
							Магазин деталей для газовых котлов
						</h3>
						<ul className={styles.contacts__info_list}>
							{contacts.map((item, i) => (
								<li
									key={i}
									className={cl(styles.contacts__info_item, {
										[styles.dark]: mode === 'dark',
									})}
								>
									<span>{item.title}</span>
									<span>
										{item.title === 'Email:' && (
											<i className="fa fa-envelope-o" aria-hidden="true"></i>
										)}
										{item.info}
									</span>
								</li>
							))}
						</ul>
					</div>
					<ContactsForm />
				</div>
			</div>
		</section>
	)
}
