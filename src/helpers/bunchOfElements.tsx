import Button from '../components/ElementsContent/Button'
import Label from '../components/ElementsContent/Label'
import Panel from '../components/ElementsContent/Panel'
import { TPropsDataContent, TYPE_CONTENT } from '../Types'

export const BunchOfElements = (dataEl: TPropsDataContent) => {
	if ('content' in dataEl) {
		return <></>
	} else {
		switch (dataEl.type) {
			case TYPE_CONTENT.button:
				return <Button width={dataEl.props.width} height={dataEl.props.height} visible={dataEl.props.visible} caption={dataEl.props.caption} />
			case TYPE_CONTENT.label:
				return <Label visible={dataEl.props.visible} caption={dataEl.props.caption} />
			case TYPE_CONTENT.panel:
				return <Panel width={dataEl.props.width} height={dataEl.props.height} visible={dataEl.props.visible} />
		}
	}
}
