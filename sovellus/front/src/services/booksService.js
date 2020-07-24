import axios from 'axios'
import { serverBaseUrl } from '../constants'

const bookRouteUrl = `${serverBaseUrl}/books`

let serviceToken = ''
let config = {}

const setToken = (token) => {
    serviceToken = `bearer ${token}`
    config = {
        headers: {authorization: serviceToken}
      }
}

const getAll = async () => {
    const  response = await axios.get(bookRouteUrl, config)
    return response.data
}

export default {
    getAll,
    setToken
}