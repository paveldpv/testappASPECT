import './App.css'
import Wrapper from './components/Wrapper'
import {Provider} from 'react-redux'
import { rootReducer } from './redux/combineReducers'
import {createStore} from 'redux'
const store = createStore(rootReducer)

function App() {

	return (
		<>
			<Provider store={store}>
			<Wrapper/>
			</Provider>
		</>
	)
}

export default App
