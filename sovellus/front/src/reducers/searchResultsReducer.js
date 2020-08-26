import booksService from '../services/booksService'

const searchResults = []

export const search = (queryResults) => {
    return {type: 'SEARCH', data: queryResults}
}

const reducer = (state = searchResults, action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.data
        default: return state    
    }
}

export default reducer