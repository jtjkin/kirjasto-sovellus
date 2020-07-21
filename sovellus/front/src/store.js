import { createStore, combineReducers, applyMiddleware } from 'redux'

import booksReducer from './reducers/bookReducer'
import userReducer from './reducers/userReducer'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    books: booksReducer,
    user: userReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store