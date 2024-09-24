import { memo, useMemo } from 'react'
import { TPanel } from '../../Types'

function Panel({ visible = false, width = 100, height = 50 }: Partial<TPanel>) {
	const _visible = useMemo(() => {
		if (typeof visible === 'boolean') {
			return visible
		}
		visible === 'true' ? true : false
	}, [visible])

	return (
		<div
			hidden={!_visible}
			style={{
				width: `${Number(width) || 100}px`,
				height: `${Number(height) || 100}`,
			}}
			className='panel'
		>
			Panel
		</div>
	)
}
export default memo(Panel)
