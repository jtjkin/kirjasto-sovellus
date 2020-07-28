const book = {}

export const searchBookFromDataBaseById = (id) => {
    /*
    return async dispatch => {
        const initBooks = await booksService.getAll()
        dispatch(
            {type: 'INIT_ALL', data: initBooks}
        )
    }
    */
}

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