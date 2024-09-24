export type TDataContent = { content: TPropsDataContent[] } &{[key:string]:any}

export enum TYPE_CONTENT {
	panel = 'panel',
	label = 'label',
	button = 'button',
}

export type TPropsDataContent =
	| ({ type: TYPE_CONTENT.button } & { props: TButton })
	| ({ type: TYPE_CONTENT.label } & { props: TLabel })
	| ({ type: TYPE_CONTENT.panel } & { props: TPanel })
	| TDataContent


export type TButton = {
	width: number
	height: number
	visible: boolean
	caption: string
}
export type TLabel = Pick<TButton, 'caption' | 'visible'>
export type TPanel = Omit<TButton, 'caption'>


 export type TError ={
	error:boolean
	message?:string
 }