import { BunchOfElements } from '../helpers/bunchOfElements'
import { TDataContent } from '../Types'

export default function ListElements({ content }: TDataContent) {
	
	
	return (
		<div>
			{content.map((elContent, index) =>
				'content' in elContent ? (
					
					<ListElements content={elContent.content} key={index}/>
				) : (
					<div key={Math.random()}>{BunchOfElements(elContent)}</div>
				)
			)}
		</div>
	)
}
