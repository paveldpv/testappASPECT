
import Content from './CotainerContent'
import RulePanel from './RulePanel'

export default function Wrapper() {
	
	return (
		<div className='wrapper'>
			<RulePanel/>
			<hr />
			<Content/>
		</div>
	)
}
