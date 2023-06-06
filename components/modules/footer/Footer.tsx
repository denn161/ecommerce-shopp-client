import cl from 'classnames'

import styles from './Footer.module.scss'
import FooterLogo from './FooterLogo'
import MailSvg from './img/MailSvg'
import MapSvg from './img/MapSvg'
import { GooglePaySvg, MasterCardSvg, PaySvg, VisaSvg } from './img/PaySvg'
import PhoneSvg from './img/PhoneSvg'
import { FacebookSvg, InstaSvg, VkSvg, YoutubeSvg } from './img/SocialSvg'
import CompanyList from './list/CompanyList'
import OnlineStore from './list/OnlineStore'
import Accordion from '@/components/elements/accordion/Accordion'
import useWindowWidth from '@/hooks/useMediaQuery'

const Footer = () => {
	const { isMedia: isLogo } = useWindowWidth(750)
	const { isMedia } = useWindowWidth(550)
	return (
		<footer className={cl(styles.footer)}>
			<div className={styles.footer__container}>
				<div className={styles.footer__top}>
					{!isLogo && <FooterLogo />}
					<div className={styles.footer__inner}>
						<div className={styles.footer__top_item}>
							{isMedia ? (
								<Accordion
									titleClass={styles.footer__inner_title}
									title={'Интернет-магазин'}
								>
									<OnlineStore />
									<div style={{ height: 17 }}></div>
								</Accordion>
							) : (
								<>
									<h3 className={styles.footer__inner_title}>
										Интернет-магазин
									</h3>
									<OnlineStore />
								</>
							)}
						</div>
						<div className={styles.footer__top_item}>
							{isMedia ? (
								<Accordion
									titleClass={styles.footer__inner_title}
									title={'Компания'}
								>
									<CompanyList />
									<div style={{ height: 17 }}></div>
								</Accordion>
							) : (
								<>
									<h3 className={styles.footer__inner_title}>Компания</h3>
									<CompanyList />
								</>
							)}
						</div>
					</div>
					<div className={styles.footer__top_item}>
						<h3 className={styles.footer__top_item_title}>Контакты</h3>
						<ul className={styles.footer__top_item_contacts}>
							<li>
								<a>
									<span>Наш адрес</span>
									<span>
										<MapSvg />
										г. Москва, ул. ... д....
									</span>
								</a>
							</li>
							<li>
								<a>
									<span>Наш контактный телефон:</span>
									<span>
										<PhoneSvg />
										+7(8095) 555-55-55
									</span>
								</a>
							</li>
							<li>
								<a>
									<span>Email</span>
									<span>
										<MailSvg />
										+7(8095) 555-55-55
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className={styles.footer__bottom}>
					<div className={styles.footer__bottom_top}>
						<div className={styles.footer__bottom_top_pay}>
							<div className={styles.footer__bottom_top_text}>
								Мы принимаем к оплате:
							</div>
							<div className={styles.footer__bottom_top_cards}>
								<span>
									<PaySvg />
								</span>
								<span>
									<GooglePaySvg />
								</span>
								<span>
									<MasterCardSvg />
								</span>
								<span>
									<VisaSvg />
								</span>
							</div>
						</div>
						<div className={styles.footer__bottom_top_social}>
							<div>Мы в соцсети:</div>
							<div className={styles.footer__bottom_top_social_links}>
								<a href="#">
									<VkSvg />
								</a>
								<a href="#">
									<FacebookSvg />
								</a>
								<a href="#">
									<InstaSvg />
								</a>
								<a href="#">
									<YoutubeSvg />
								</a>
							</div>
						</div>
					</div>
					<div className={styles.footer__bottom_copy}>
						<p>© «Детали для газовых котлов» {new Date().getFullYear()}</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
