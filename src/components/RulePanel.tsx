import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { ValidatorField } from '../helpers/classes/validatorFiled'
import { assertIsFormFieldElement } from '../helpers/function/assertIsFormFieldElement'
import { addContent } from '../redux/actions'

export default function RulePanel() {
	const dispatch = useDispatch()

	const handlerClick = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const currentTargetValue = e.currentTarget[1]
		const currentTargetPath = e.currentTarget[0]
		assertIsFormFieldElement(currentTargetValue)
		assertIsFormFieldElement(currentTargetPath)
		const value = currentTargetValue.value
		const path = currentTargetPath.value

		if(!value){
			alert('нет данных в value')
			return
		}
		const validatorFiled = new ValidatorField(value, path).isValidValue()
		if ('error' in validatorFiled) {
			return alert(validatorFiled.message)
		} else {
			dispatch(
				addContent({ value: validatorFiled.value, path: validatorFiled.path|| "" })
			)
		}
	}
	return (
		<form className='panel_rule' onSubmit={handlerClick}>
			<div className='field'>				
				<textarea
					name='path'
					id='path'
					
					placeholder=''
					className='field__input'
					
				/>
				<label htmlFor='path' className='field__label'>
					Путь
				</label>
			</div>
			<div className='field'>
				<textarea
					name='value'
					id='value'
					
					placeholder=''
					className='field__input'
				/>
				<label htmlFor='value' className='field__label'>
					Новое значение
				</label>
			</div>
			<button type='submit' className='button'>
				Применить
			</button>
		</form>
	)
}
