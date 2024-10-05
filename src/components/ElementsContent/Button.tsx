import { useMemo ,memo} from 'react'
import { TButton } from '../../Types'


 function Button({ caption="", visible=false, width=100, height=50 }: Partial<TButton>) {

	const _visible = useMemo(()=>{
		if(typeof visible ==='boolean'){
			return visible
		}
	 return	visible==="true"?true:false
	},[visible])
	
	

	return (
		<button
			hidden={!_visible}
			style={{
				width:`${Number(width)||100}px`,
				height:`${Number(height)||100}px`,
			}}
		>
			{caption}
		</button>
	)
}

export default memo(Button)