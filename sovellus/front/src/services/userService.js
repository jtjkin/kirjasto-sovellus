import axios from 'axios'
import { serverBaseUrl } from '../constants'

const loginRouteUrl = `${serverBaseUrl}/login`
const userRouteUrl = `${serverBaseUrl}/users`

let config = {}

const ping = async () => {
    const response = await axios.get(loginRouteUrl + '/ping')
    return response.data
}

const setToken = (token) => {
    const serviceToken = `bearer ${token}`
    config = {
        headers: {authorization: serviceToken}
      }
}

const login = async (loginData) => {
    try {
        const  response = await axios.post(loginRouteUrl, loginData)
        return response.data
    } catch (error) {
        alert('Virhe kirjautumisessa. ' + error.response.data)
    }
    
}

const getUser = async () => {
    try {
        const response = await axios.get(userRouteUrl, config)
        return response.data
    } catch (error) {
        console.log('Virhe haettaessa käyttäjän tietoja: ', error.response?.data)
    }
}

const getUserInfoById = async (id) => {
    //oltava avoin kaikille, koska lainaukset ja varaukset id:n varassa.
    //haku backista id:n avulla
    //jos admin, enemmän tietoa?
}

const addNewUser = async (user) => {
        const response = await axios.post(userRouteUrl, user)
        return response.data
}

const updateUser = async (newData) => {
    const response = await axios.post(`${userRouteUrl}/update-user`, newData, config)
    return response.data
}

export default {
    login,
    getUser,
    setToken,
    ping,
    getUserInfoById,
    addNewUser,
    updateUser
}