import userService from '../services/userService'

const user = {}

export const initUser = ({id}) => {
    return async dispatch => {
        const initUser = await userService.getUserData(id)
        dispatch(
            {type: 'INIT_USER', data: initUser}
        )
    }
}

const reducer = (state = user, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return action.data
        default: return state    
    }
}

export default reducer