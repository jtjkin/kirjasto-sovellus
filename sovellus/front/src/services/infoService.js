import axios from 'axios'
import { serverBaseUrl } from '../constants'

const infoRouteUrl = `${serverBaseUrl}/info`
let config = {}

const setToken = (token) => {
    const serviceToken = `bearer ${token}`
    config = {
        headers: {authorization: serviceToken}
      }
}

const getBulletins = async () => {
    const  response = await axios.get(infoRouteUrl)
    return response.data
}

export default {
    setToken,
    getBulletins
}