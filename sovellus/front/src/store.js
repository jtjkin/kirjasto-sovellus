import { createStore, combineReducers, applyMiddleware } from 'redux'

import booksReducer from './reducers/bookReducer'
import tokenReducer from './reducers/tokenReducer'
import userReducer from './reducers/userReducer'
import infoReducer from './reducers/infoReducer'
import singleBookReducer from './reducers/singleBookReducer'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    books: booksReducer,
    token: tokenReducer,
    user: userReducer,
    info: infoReducer,
    singleBook: singleBookReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store