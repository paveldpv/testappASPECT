import { useSelector } from 'react-redux'
import { TDataContent } from '../Types'
import ListElements from './ListElements'








export default function Content() {
	const { content } = useSelector<{ addContent: TDataContent }>(
		(state) => state!.addContent
	) as TDataContent
	
	return (
		<div className='content'>
			<ListElements content={content}/>
		</div>
	)
}
