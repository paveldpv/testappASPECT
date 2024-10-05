import { TDataContent } from '../Types'
import { ACTION } from './actions'

function setValueByPath(obj: any, path: string, value: any) {
	const parts = path.split(/\.|\[|\]|\//).filter((el) => el)
	let currentObj = obj

	for (let i = 0; i < parts.length - 1; i++) {
		const part = parts[i]
		if (!currentObj[part]) {
			currentObj[part] = {}
		}
		currentObj = currentObj[part]
	}

	currentObj[parts[parts.length - 1]] = value
	return obj
}

const initialState = {
	content: [
		{ type: 'button', props: { caption: 'initialButton', width: 50, height: 50, visible: true } },
		{ type: 'label', props: { caption: 'initialLabel', visible: true } },
		{ type: 'panel', props: {  width: 50, height: 50, visible: true } }
	]
}

//{content:[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}},{ type: 'label', props: { caption: 'initial label', visible: true }}]} ?? testing data
//[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}},{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}] ?? testing data
//{content:[{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}]} ?? testing data
//{type: 'button', props: {caption: 'test', width:50,height:50,visible: true}}, ?? testing data
//content[2].props.caption ?? testing data
//content[4].content[0].props.caption ?? testing data
export const addContent = (state = initialState, action: { type: ACTION; payload: { value: TDataContent; path?: string } }) => {
	

	switch (action.type) {
		case ACTION.addContent:
			if (action.payload.path) {
				
				
				const { value, path } = action.payload
				const copyState = JSON.parse(JSON.stringify(state))
				//формально state больше не изменяется
				return {
					content: [...setValueByPath(copyState, path, value).content],
					// content: [...state.content]
				}
			} else {
				const { value } = action.payload
				if (Array.isArray(value)) {
					return {
						content: [...state.content, ...(<any>action.payload.value)],
					}
				}
				return {
					content: [...state.content, action.payload.value],
				}
			}

		default:
			return state
	}
}
