import { useSelector } from 'react-redux'

const GetUserInfo = () => {
    const token = useSelector(state => state.token)
    const id = useSelector(state => state.user.id)

    return {
        token,
        id
    }
}

export default GetUserInfo