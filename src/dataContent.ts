import { TDataContent, TYPE_CONTENT } from './Types'

export const dataContent: TDataContent = [
	{
		type: TYPE_CONTENT.panel,
		props: {
			width: 500,
			height: 200,
			visible: true,
			
		},
	},
	{
		type: TYPE_CONTENT.label,
		props: {
			caption: 'test',
			visible: false,
		},
	},
	{
		type: TYPE_CONTENT.button,
		props: {
			width: 100,
			height: 50,
			visible: true,
			caption:'применить'
		},
	}
]
