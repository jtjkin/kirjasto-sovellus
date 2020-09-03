const book = {}

export const addBook = (book) => {
    return {type: 'ADD_BOOK', data: book}
}

const reducer = (state = book, action) => {
    switch (action.type) {
        case 'ADD_BOOK':
            return action.data
        default: return state    
    }
}

export default reducer