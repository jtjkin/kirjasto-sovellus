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
    /*
        @return: bulletins: Array [string]
    */

    try {
        const  response = await axios.get(infoRouteUrl, config)
        return response.data
    } catch (error) {
       return error.response?.data 
    }
}

const saveBulletin = async (bulletin) => {
    /*
        @param: string

        @return: string (message: success (200) or error (401))
    */

    try {
        const response = await axios.post(`${infoRouteUrl}/add-bulletin`, {bulletin}, config)
        return response.data
    } catch (error) {
        return error.response?.data 
    } 
}

const deleteBulletin = async (bulletin) => {
    /*
        @param: string

        @return: response.status: number (200 or 401)
    */

    try {
        const response = await axios.post(`${infoRouteUrl}/delete-bulletin`, {bulletin}, config)
        return response.status
    } catch (error) {
        return error.response?.data
    }
}

const adminPanel = async () => {
    /*
        @return: {
            bulletins: Array [string],
            adminList: Array { // people with admin-rights
                id: string (user id),
                name: string,
                role: string
            }
            joinCode: string
        }
    */

    try {
        const response = await axios.get(`${infoRouteUrl}/admin-panel`, config)
        return response.data
    } catch (error) {
        return error.response?.data
    }
}

const updateJoinCode = async (code) => {
    /*
        @param: string

        @return: response.status: number (200 or 401)
    */

    try {
        const response = await axios.post(`${infoRouteUrl}/change-joincode`, {code}, config)
        return response.status
    } catch (error) {
        return error.response?.data
    }
    
}

export default {
    setToken,
    getBulletins,
    adminPanel,
    saveBulletin,
    deleteBulletin,
    updateJoinCode
}