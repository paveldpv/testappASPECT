import { useMemo, memo } from 'react'
import { TLabel } from '../../Types'



 function Label({caption="void",visible=false}: Partial<TLabel>) {

	const _visible = useMemo(()=>{
		if(typeof visible ==='boolean'){
			return visible
		}
		visible==="true"?true:false
	},[visible])
	
	return (
		<span hidden={!_visible} className='label'>{caption}</span>
	)
}

export default memo(Label)