import Button from '../components/ElementsContent/Button'
import Label from '../components/ElementsContent/Label'
import Panel from '../components/ElementsContent/Panel'
import { TPropsDataContent, TYPE_CONTENT } from '../Types'

export const BunchOfElements = (dataEl: TPropsDataContent, key: any) => {
	if ('content' in dataEl) {
		return <></>
	} else {
		switch (dataEl.type) {
			case TYPE_CONTENT.button:
				return (
					<Button
						key={key}
						width={dataEl.props.width}
						height={dataEl.props.height}
						visible={dataEl.props.visible}
						caption={dataEl.props.caption}
					/>
				)
			case TYPE_CONTENT.label:
				return (
					<Label
					key={key}
						visible={dataEl.props.visible}
						caption={dataEl.props.caption}
					/>
				)
			case TYPE_CONTENT.panel:
				return (
					<Panel
						key={key}
						width={dataEl.props.width}
						height={dataEl.props.height}
						visible={dataEl.props.visible}
					/>
				)
		}
	}
}