import axios from 'axios'
import { serverBaseUrl } from '../constants'

const bookRouteUrl = `${serverBaseUrl}/books`

let token = null

const getAll = async () => {
    const  response = await axios.get(bookRouteUrl)
    return response.data
}

export default {
    getAll
}