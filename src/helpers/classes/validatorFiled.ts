import {
	TButton,
	TDataContent,
	TError,
	TLabel,
	TPanel,
	TYPE_CONTENT,
} from '../../Types'

export class ValidatorField {
	private propertyContentElement = ['width', 'height', 'caption', 'visible']
	private _path: string | undefined
	private _value: string
	private _dataString: string
	private _arrDataText: string[] = []
	private regEx = new RegExp(/[A-Za-z]/)
	private _parseResult: TDataContent
	private error: TError

	constructor(str: string, path?: string) {
		this._value = str
		this._path = path ? path : undefined
		this._dataString = str.replace(/'/g, '')
		this._arrDataText = this._dataString.split('')
		this._parseResult = { content: [] }
		this.error = {
			error: false,
		}
	}
	private linePreparation() {
		let word = ''
		let result: string[] = []
		this._arrDataText.forEach((el) => {
			if (!this.regEx.test(el)) {
				if (word) {
					result.push(word)
					word = ''
				}

				result.push(el)
			} else {
				word += el
			}
		})

		this._dataString = result
			.filter((el) => el != ' ')
			.reduce((acc, current) => {
				if (this.regEx.test(current)) {
					if (current === 'true' || current === 'false') {
						return acc + `${current}`
					}
					return acc + `"${current}"`
				} else {
					return acc + current
				}
			}, '')
	}

	private isValidStructure(): TError {
		try {
			this._parseResult = JSON.parse(this._dataString)

			return {
				error: false,
			}
		} catch (error) {
			return {
				error: true,
				message: 'не верная запись',
			}
		}
	}

	private validatorTypeButton(
		el: { type: TYPE_CONTENT.button } & { props: Partial<TButton> }
	): TError {
		if (!el.props) {
			return {
				error: true,
				message: `в типе button отсутствует свойства props`,
			}
		}

		switch (false) {
			case 'caption' in el.props: {
				return {
					error: true,
					message: ` caption отсутствует свойства button.props`,
				}
			}
			case 'height' in el.props: {
				return {
					error: true,
					message: ` heigh отсутствует свойства button.props`,
				}
			}
			case 'width' in el.props: {
				return {
					error: true,
					message: ` width отсутствует свойства button.props`,
				}
			}

			case 'visible' in el.props: {
				return {
					error: true,
					message: ` visible отсутствует свойства button.props`,
				}
			}
			default: {
				return {
					error: false,
				}
			}
		}
	}

	private validatorTypeLabel(
		el: { type: TYPE_CONTENT.label } & { props: Partial<TLabel> }
	): TError {
		if (!el.props) {
			return {
				error: true,
				message: ` label отсутствует свойства props`,
			}
		}

		switch (false) {
			case 'caption' in el.props: {
				return {
					error: true,
					message: ` caption отсутствует свойства label.props`,
				}
			}

			case 'visible' in el.props: {
				return {
					error: true,
					message: ` visible отсутствует свойства label.props`,
				}
			}
			default: {
				return {
					error: false,
				}
			}
		}
	}
	private validatorTypePanel(
		el: { type: TYPE_CONTENT.panel } & { props: Partial<TPanel> }
	): TError {
		if (!el.props) {
			return {
				error: true,
				message: ` panel отсутствует свойства props`,
			}
		}

		switch (false) {
			case 'height' in el.props: {
				return {
					error: true,
					message: ` heigh отсутствует свойства panel.props`,
				}
			}
			case 'width' in el.props: {
				return {
					error: true,
					message: ` width отсутствует свойства panel.props`,
				}
			}

			case 'visible' in el.props: {
				return {
					error: true,
					message: `visible отсутствует свойства panel.props`,
				}
			}
			default: {
				return {
					error: false,
				}
			}
		}
	}

	private validatorFieldContent(
		el:
			| ({ type: TYPE_CONTENT.button } & { props: TButton })
			| ({ type: TYPE_CONTENT.label } & { props: TLabel })
			| ({ type: TYPE_CONTENT.panel } & { props: TPanel })
	): TError {
		let error: TError = {
			error: false,
		}
		switch (el.type) {
			case TYPE_CONTENT.button:
				const validButton = this.validatorTypeButton(el)
				if (validButton.error) {
					error = validButton
				}
				break
			case TYPE_CONTENT.label:
				const validLabel = this.validatorTypeLabel(el)
				if (validLabel.error) {
					error = validLabel
				}
				break
			case TYPE_CONTENT.panel:
				const validPanel = this.validatorTypePanel(el)
				if (validPanel.error) {
					error = validPanel
				}
				break
			default:
				return {
					error: false,
				}
		}
		return error
	}

	private validatorData(content: TDataContent): TError {
		var error: TError = {
			error: false,
		}

		for (const key in content) {
			if ('content' in content) {
				//{},[]
				if (!Array.isArray(content.content)) {
					return {
						error: true,
						message: `content должен быть []`,
					}
				}
				content.content.forEach((el) => {
					if ('content' in el) this.validatorData(el)
					//@ts-ignore
					const er = this.validatorFieldContent(el)
					if (er.error) {
						error = er
					}

					//swith
				})
			}
			//@ts-ignore
			error = this.validatorFieldContent(content)
		}
		return error
	}

	public getValidStructur() {
		this.linePreparation()
		this.isValidStructure()
		return this._parseResult
	}

	public isValidValue(): TError | { value: any; path?: string } {
		if (this._path) {
			const lastProperty = this._path.split('.')
			const isLastPath = this.propertyContentElement.some(
				(el) => el === lastProperty[lastProperty.length - 1]
			)
			if (isLastPath) {
				//ошибок нет значение является просто стройкой
				return {
					value: this._value,
					path: this._path,
				}
			} else {
				//  тут value разбираем на json
				this.linePreparation() //перерерабатываем входную строку в строку которую сможем перевести в json
				const isValidStructure = this.isValidStructure() //
				if (isValidStructure.error) {
					//если json не получился возращаем ошибку
					return isValidStructure
				}
				return {
					value: this._parseResult,
					path: this._path,
				}
				//const error = this.validatorData(this._parseResult) //рекурсивно иследуем все поля если какого то поля не хватает выкидываем ошибку
				// return error
			}
		} else {
			this.linePreparation()
			const isValidStructure = this.isValidStructure()

			if (isValidStructure.error) {
				return isValidStructure
			}

			const error = this.validatorData(this._parseResult)
			if (error.error) {
				return error
			} else {
				return { value: this._parseResult }
			}
			// return error
		}
	}
}
