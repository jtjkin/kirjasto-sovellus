import userService from '../services/userService'

const user = {}

export const initUser = () => {
    return async dispatch => {
        const initUser = await userService.getUser()
        dispatch(
            {type: 'INIT_USER', data: initUser}
        )
    }
}

export const updateUser = (user) => {
    return {type: 'UPDATE_USER', data: user}
}

const reducer = (state = user, action) => {
    switch (action.type) {
        case 'INIT_USER':
            if (!action.data) {
                return state
            }
            return action.data
        case 'UPDATE_USER':
            return action.data
        default: return state    
    }
}

export default reducer