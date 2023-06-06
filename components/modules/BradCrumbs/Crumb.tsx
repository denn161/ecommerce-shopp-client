import cl from 'classnames'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import styles from './BreadCrumbs.module.scss'
import CrumbArrowSvg from './svg/CrumbArrowSvg'
import { $mode } from '@/context/mode'

interface ICrumb {
	text: string
	textGenerator: () => string
	href: string
	last: boolean
}

function Crumb({
	text: defaultText,
	textGenerator,
	href,
	last = false,
}: ICrumb) {
	const [text, setText] = useState(defaultText)
	const mode = useStore($mode)

	const textGen = useCallback(async () => {
		if (!Boolean(textGenerator)) return

		const finalText = await textGenerator()
		setText(finalText)
	}, [textGenerator])

	useEffect(() => {
		textGen()
	}, [textGenerator])

	if (last) {
		return (
			<a>
				<span
					className={cl(styles.breadcrumbs__item_icon, {
						[styles.dark]: mode === 'dark',
					})}
					style={{ marginRight: 13 }}
				>
					<CrumbArrowSvg />
				</span>
				<span
					className={cl(styles.breadcrumbs__item_text, 'last-crumb', {
						[styles.dark]: mode === 'dark',
					})}
				>
					{text}
				</span>
			</a>
		)
	}
	return (
		<Link className={cl(styles.breadcrumbs__item_link)} href={href}>
			<span>
				<CrumbArrowSvg />
			</span>
			<span
				className={cl(styles.breadcrumbs__item_text, {
					[styles.dark]: mode === 'dark',
				})}
			>
				{text}
			</span>
		</Link>
	)
}

export default Crumb
