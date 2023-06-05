import cl from 'classnames'

import styles from './TemplateName.module.scss'

interface ITemplateNameProps {}

export const TemplateName = ({}: ITemplateNameProps) => {
	return <div className={cl(styles.templateName)}>TemplateName</div>
}
