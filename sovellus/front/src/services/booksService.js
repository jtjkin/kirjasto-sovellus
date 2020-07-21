import axios from 'axios'
import { serverBaseUrl } from '../constants'
import { useSelector } from 'react-redux'

const bookRouteUrl = `${serverBaseUrl}/books`
//const token = useSelector(state => state.token)

const getAll = async () => {
    const  response = await axios.get(bookRouteUrl)
    return response.data
}

export default {
    getAll
}