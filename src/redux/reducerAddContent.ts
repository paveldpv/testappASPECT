import { TDataContent } from '../Types'
import { ACTION } from './actions'

function setValueByPath(obj:any, path:string, value:any) {
	const parts = path.split(/\.|\[|\]|\//).filter(el=>el);
	let currentObj = obj;
	
	for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (!currentObj[part]) {
					currentObj[part] = {};
			}
			currentObj = currentObj[part];
	}
	
	currentObj[parts[parts.length - 1]] = value;
	return obj
}


const initialState = {
	content: [],
}
//{content:[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}]}
//{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}
//content[2].props.caption
export const addContent = (
	state = initialState,
	action: { type: ACTION; payload: { value: TDataContent; path?: string } }
) => {
	console.log(state);
	
	switch (action.type) {
		case ACTION.addContent:
			if (action.payload.path) {
				
				 
				
				
				console.log(state);
				const {value,path}=action.payload
				
				
				return {				
				content:[...setValueByPath(state,path,value).content]
					// content: [...state.content] 
				}
				
				
			} else {
				
				return {					
					content: [...state.content, action.payload.value] ,
				}
			}

		default:
			return state
	}
}
