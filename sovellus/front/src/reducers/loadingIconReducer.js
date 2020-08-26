const loadignIconState = true

export const setLoadingIcon = () => {
    return {type: 'SETLOADINGICON'}

}

const reducer = (state = loadignIconState, action) => {
    switch (action.type) {
        case 'SETLOADINGICON':
            return false
        default: return state    
    }
}

export default reducer