import booksService from '../services/booksService'

const books = []

export const initBooks = () => {
    return async dispatch => {
        const initBooks = await booksService.getAll()
        dispatch(
            {type: 'INIT_ALL', data: initBooks}
        )
    }
}

const reducer = (state = books, action) => {
    switch (action.type) {
        case 'INIT_ALL':
            return action.data
        default: return state    
    }
}

export default reducer