const token = null

export const initToken = (token) => {
    return {type: 'INIT_TOKEN', token}
}

export const removeToken = () => {
    return {type: 'REMOVE_TOKEN'}
}

const reducer = (state = token, action) => {
    switch (action.type) {
        case 'INIT_TOKEN':
            return action.token
        case 'REMOVE_TOKEN':
            return null    
        default: return state    
    }
}

export default reducer