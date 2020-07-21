const token = null

export const initToken = (token) => {
    return {type: 'INIT_TOKEN', token}
}

const reducer = (state = token, action) => {
    switch (action.type) {
        case 'INIT_TOKEN':
            return action.token
        default: return state    
    }
}

export default reducer