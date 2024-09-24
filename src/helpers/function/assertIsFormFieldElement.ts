export function assertIsFormFieldElement(
	element: Element
): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
	if (!('value' in element)) {
		throw new Error(`Element is not a form field element`)
	}
}
