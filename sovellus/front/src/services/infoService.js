import axios from 'axios'
import { serverBaseUrl } from '../constants'

const infoRouteUrl = `${serverBaseUrl}/info`
let serviceToken = ''

const setToken = (token) => {
    serviceToken = `bearer ${token}`
}

const getBulletins = async () => {
    const  response = await axios.get(infoRouteUrl)
    return response.data
}

export default {
    setToken,
    getBulletins
}