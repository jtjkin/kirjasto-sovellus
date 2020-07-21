import axios from 'axios'
import { serverBaseUrl } from '../constants'

const loginRouteUrl = `${serverBaseUrl}/login`

const login = async (loginData) => {
    const  response = await axios.post(loginRouteUrl, loginData)
    return response.data
}

export default {
    login
}