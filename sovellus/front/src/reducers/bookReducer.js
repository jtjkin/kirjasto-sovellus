const books = []

export const searchResults = (queryResults) => {
    return {type: 'SEARCH', data: queryResults}
}

export const clear = () => {
    return {type: 'CLEAR'}
}

const reducer = (state = books, action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.data
        case 'CLEAR':
            const newBooks = []
            return newBooks
        default: return state    
    }
}

export default reducer