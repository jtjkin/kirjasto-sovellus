import axios from 'axios'
import { serverBaseUrl } from '../constants'

const loginRouteUrl = `${serverBaseUrl}/login`
const userRouteUrl = `${serverBaseUrl}/users`
let serviceToken = ''

const ping = async () => {
    const response = await axios.get(loginRouteUrl + '/ping')
    return response.data
}

const setToken = (token) => {
    serviceToken = token
}

const login = async (loginData) => {
    try {
        const  response = await axios.post(loginRouteUrl, loginData)
        return response.data
    } catch (error) {
        alert('Virhe kirjautumisessa. ' + error.response.data)
    }
    
}

const getUserData = async (props) => {
    //props.id
    //headeriin token
    return {email: 'moi', id: 123456}
}

export default {
    login,
    getUserData,
    setToken,
    ping
}