const metaData = {
    exact: null,
    notFound: null,
    searchterms: null,
    loadingIconState: true
}

export const setLoadingIcon = () => {
    return {type: 'SETLOADINGICON'}
}

export const setSearchMetaData = (data) => {
    return {type: 'SETSEARCHMETADATA', data}
}

export const setSearchTerms = (data) => {
    return {type: 'SETSEARCHTERMS', data}
}

const reducer = (state = metaData, action) => {
    switch (action.type) {
        case 'SETSEARCHTERMS':
            const searchtermsState = state
            searchtermsState.searchterms = action.data
            return searchtermsState
        case 'SETSEARCHMETADATA':
            const metaDataState = {
                exact: action.data.exact,
                notFound: action.data.notFound,
                searchterms: state.searchterms,
                loadingIconState: state.loadingIconState
            }
            return metaDataState
        case 'SETLOADINGICON':
            const loadingState = state
            loadingState.loadingIconState =false
            return loadingState
        default: return state    
    }
}

export default reducer