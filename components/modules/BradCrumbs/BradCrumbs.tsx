import cl from 'classnames'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import styles from './BreadCrumbs.module.scss'
import Crumb from './Crumb'
import DefaultCrumbSvg from './svg/DefaultCrumbSvg'
import { $mode } from '@/context/mode'
import { IBradCrumbs } from '@/types/brad-crumbs'
import { generatePathParts } from '@/utils/brad-crumbs'

const Breadcrumbs = ({
	getTextGenerator,
	getDefaultTextGenerator,
}: IBradCrumbs) => {
	const router = useRouter()
	const mode = useStore($mode)

	const breadcrumbs = useMemo(
		function generateBreadcrumbs() {
			const asPathNestedRoutes = generatePathParts(router.asPath)
			const pathnameNestedRoutes = generatePathParts(router.pathname)

			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				const param = pathnameNestedRoutes[idx]
					.replace('[', '')
					.replace(']', '')

				const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
				return {
					href,
					textGenerator: getTextGenerator(param, router.query),
					text: getDefaultTextGenerator(subpath, href),
				}
			})

			return [...crumblist]
		},
		[
			router.asPath,
			router.pathname,
			router.query,
			getTextGenerator,
			getDefaultTextGenerator,
		]
	)

	return (
		<div className="container">
			<ul className={styles.breadcrumbs__list}>
				<li className={styles.breadcrumbs__item}>
					<Link
						className={cl(styles.breadcrumbs__default_link, {
							[styles.dark]: mode === 'dark',
						})}
						href="/dashboard"
					>
						<DefaultCrumbSvg />
					</Link>
				</li>
				{breadcrumbs.map((crumb, idx) =>
					crumb.text ? (
						<li key={idx} className={styles.breadcrumbs__item}>
							{/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
							 * @ts-ignore */}
							<Crumb
								{...crumb}
								key={idx}
								last={idx === breadcrumbs.length - 1}
							/>
						</li>
					) : (
						''
					)
				)}
			</ul>
		</div>
	)
}
export default Breadcrumbs
