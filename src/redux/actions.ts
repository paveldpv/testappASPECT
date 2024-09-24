import { TDataContent } from '../Types'

export enum ACTION {
addContent = "ADD_CONTENT"
}

export function addContent(content:{value:TDataContent,path?:string}){
	return{
		type:ACTION.addContent,
		payload:content
	}
}