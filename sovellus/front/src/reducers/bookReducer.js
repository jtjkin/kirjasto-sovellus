import booksService from '../services/booksService'

const books = []


//REMOVE
export const initSearchResults = () => {
    return async dispatch => {
        const initBooks = await booksService.searchBooks()
        dispatch(
            {type: 'INIT_ALL', data: initBooks}
        )
    }
}

export const search = (queryResults) => {
    return {type: 'SEARCH', data: queryResults}
}

const reducer = (state = books, action) => {
    switch (action.type) {
        case 'INIT_ALL':
            return action.data
        case 'SEARCH':
            return action.data
        default: return state    
    }
}

export default reducer