import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import reducer from './reducers/anecdoteReducer'

const rootReducer = combineReducers({
  anecdotes: reducer,
})
const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
