import {combineReducers }from 'redux'
import { addContent } from './reducerAddContent'

export const rootReducer = combineReducers({
	addContent:addContent
})