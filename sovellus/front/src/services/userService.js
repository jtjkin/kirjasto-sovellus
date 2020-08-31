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
    /*
        @param: {
            email: string, 
            password: string
        }

        @return: {
            token: string,
            id: string[user id]
        }
    */
    
    try {
        const  response = await axios.post(loginRouteUrl, loginData)
        return response.data
    } catch (error) {
        alert('Virhe kirjautumisessa. ' + error.response.data)
    }
    
}

const getUser = async () => {
    /*
        Get current users information.

        @return {
            id: string[user id],
            admin: boolean,
            canAddBooks: boolean //Currently not in use. Can be implemented to borrowing suspension -functionality.
            role: string,

            arrivedReservations: Array {
                id: string[book id]
                authorsShort: string,
                publicationYear: number,
                title: string
            }

            loans: Array {
                id: string[book id]
                authorsShort: string,
                publicationYear: number,
                title: string
                borrowDate: Date 
            }

            reservations: Array {
                id: string[book.id]
                authorsShort: string,
                publicationYear: number,
                title: string
            }
        }

    */

    try {
        const response = await axios.get(userRouteUrl, config)
        return response.data
    } catch (error) {
        console.log('Virhe haettaessa käyttäjän tietoja: ', error.response?.data)
    }
}

const getUserInfoById = async (id) => {
    /*
        For admins to get more info about users. Used for granting new admin rights.

        @param: id: string[user id]

        @return {
            id: string [user id],
            name: string,
            role: string
        }
    */
    const response = await axios.post(`${userRouteUrl}/user`, {id}, config)
    return response.data
}

const findUserByName = async (name) => {
    /*  
        @param: name: string

        @return {
            id: string [user id],
            name: string,
            exact: boolean [checks if exact match was found from the database. 
                if true, return name+id of the match. If false, returns name+id of the closest match(string comparison)]
        }
    */

    const response = await axios.post(`${userRouteUrl}/find-user-name`, {name}, config)
    return response.data
}

const addNewUser = async (user) => {
    /*
        @param: user {
            email: string,
            name: string,
            joinCode: string,
            password: string,
            role: string
        }

        @return {

        }
    */

    const response = await axios.post(userRouteUrl, user)
    console.log(response.data)
    return response.data
}

const updateUser = async (newData) => {
    const response = await axios.post(`${userRouteUrl}/update-user`, newData, config)
    return response.data
}

const removeAdminRights = async (id) => {
    const response = await axios.post(`${userRouteUrl}/remove-admin`, {id}, config)
    return response.status
}

const addAdminRights = async (id) => {
    const response = await axios.post(`${userRouteUrl}/add-admin`, {id}, config)
    return response.status
}

export default {
    login,
    getUser,
    setToken,
    ping,
    getUserInfoById,
    addNewUser,
    updateUser,
    removeAdminRights,
    findUserByName,
    addAdminRights
}