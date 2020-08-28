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
    const  response = await axios.get(infoRouteUrl, config)
    return response.data
}

const saveBulletin = async (bulletin) => {
    const response = await axios.post(`${infoRouteUrl}/add-bulletin`, {bulletin}, config)
    return response.data
}

const adminPanel = async () => {
    const response = await axios.get(`${infoRouteUrl}/admin-panel`, config)
    return response.data
}

export default {
    setToken,
    getBulletins,
    adminPanel,
    saveBulletin
}