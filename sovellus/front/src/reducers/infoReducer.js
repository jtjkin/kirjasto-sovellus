import infoService from '../services/infoService'

const bulletins = []

export const getBulletins = () => {
    return async dispatch => {
        const Bulletins = await infoService.getBulletins()
        dispatch(
            {type: 'BULLETINS', data: Bulletins}
        )
    }
}

const reducer = (state = bulletins, action) => {
    switch (action.type) {
        case 'BULLETINS':
            return action.data.bulletins
        default: return state    
    }
}

export default reducer