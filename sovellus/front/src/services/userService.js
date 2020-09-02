import axios from 'axios'
import { serverBaseUrl } from '../constants'

const loginRouteUrl = `${serverBaseUrl}/login`
const userRouteUrl = `${serverBaseUrl}/users`

let config = {}

const setToken = (token) => {
    const serviceToken = `bearer ${token}`
    config = {
        headers: {authorization: serviceToken}
      }
}

const ping = async () => {
    /*
        @return: string
    */
    const response = await axios.get(loginRouteUrl + '/ping')
    return response.data
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

            returnRequests: Array {
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
            id: string[user id],
            admin: boolean,
            role: string,
            token: string,

            arrivedReservations: Array {
                id: string[book id]
                authorsShort: string,
                publicationYear: number,
                title: string
            },

            loans: Array {
                id: string[book id]
                authorsShort: string,
                publicationYear: number,
                title: string
                borrowDate: Date 
            },

            reservations: Array {
                id: string[book.id]
                authorsShort: string,
                publicationYear: number,
                title: string
            },

            returnRequests: Array {
                id: string[book.id]
                authorsShort: string,
                publicationYear: number,
                title: string
            }
        }
    */

    try {
        const response = await axios.post(userRouteUrl, user)
        return response.data
    } catch (error) {
        return error.response?.data.error
    } 
}

const updateUser = async (newData) => {
    console.log(newData)
    /*
        @param: newData: {
            oldPassword: string,
            newPassword: string
        }

        OR

        @param: newData: {
            newRole: string
        }

        @return: string [message: success (200) or error (401)]
    */
    try {
        const response = await axios.post(`${userRouteUrl}/update-user`, newData, config)
        return response.data
    } catch (error) {
        return error.response?.data
    }   
}

const removeAdminRights = async (id) => {
    /*
        @param: id: string

        @return: response.status: number (200 or 401)
    */

    try {
        const response = await axios.post(`${userRouteUrl}/remove-admin`, {id}, config)
        return response.status
    } catch (error) {
        return error.response?.status
    }   
}

const addAdminRights = async (id) => {
    /*
        @param: id: string

        @return: response.status: number (200 or 401)
    */

    try {
        const response = await axios.post(`${userRouteUrl}/add-admin`, {id}, config)
        return response.status
    } catch (error) {
        return error.response?.status
    }   
}

const resetPassword = async(email) => {
    /*
        @param: string

        @return: string
    */

    try {
        const response = await axios.post(`${userRouteUrl}/forgotten-password`, {email}, config)
    return response.data
    } catch (error) {
        return 'Havaittu väärinkäytös. IP-osoite on estetty väliaikaisesti.'
    }
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
    addAdminRights,
    resetPassword
}