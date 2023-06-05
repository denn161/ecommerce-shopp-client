import cl from 'classnames'

import styles from './About.module.scss'

interface IAboutProps {}

export const About = ({}: IAboutProps) => {
	return <div className={cl(styles.about)}>About</div>
}
