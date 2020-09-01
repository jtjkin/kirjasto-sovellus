import axios from 'axios'
import { serverBaseUrl } from '../constants'

const bookRouteUrl = `${serverBaseUrl}/books`

let config = {}

const setToken = (token) => {
    const serviceToken = `bearer ${token}`
    config = {
        headers: {authorization: serviceToken}
      }
}

const searchBooks = async (searchterms) => {
    /*
        @param: string

        @return: {
            exact: boolean (true if exact match with title or authors),
            notFound: boolean (true if highest match has title + author similarity 0),
            books: Array {
                id: string,
                authorsShort: string,
                title: string,
                publicationYear: number,
                status: string
            }
        }
    */
    try {
        const  response = await axios.post(bookRouteUrl, {searchterms}, config)
        return response.data
    } catch (error) {
        return error.response?.data
    }
}

const searchISBN = async (isbn) => {
    /*
        @param: string

        @return: {
            authors: string,
            authorsShort: string,
            publicationYear: number,
            publisher: string,
            title: string
        }
    */

    try {
        const response = await axios.post(`${bookRouteUrl}/search-isbn`, {isbn}, config)
        return response.data
    } catch(error) {
        return error.response
    }
    
}

const addNewBook = async (book) => {
    const response = await axios.post(`${bookRouteUrl}/add-book`, book, config)
    return response.data  
}

const getBookById = async (id) => {
    const response = await axios.get(`${bookRouteUrl}/${id}`, config)
    return response.data
}

const borrowBook = async (id) => {
    const response = await axios.post(`${bookRouteUrl}/borrow`, {id}, config)
    return response.data
}

const returnBook = async (id) => {
    const response = await axios.post(`${bookRouteUrl}/return`, {id}, config)
    return response.data
}

const reserveBook = async (id) => {
    const response = await axios.post(`${bookRouteUrl}/reserve`, {id}, config)
    return response.data
}

const cancelReservation = async (id) => {
    const response = await axios.post(`${bookRouteUrl}/cancel-reservation`, {id}, config)
    return response.data
}

export default {
    searchBooks,
    setToken,
    searchISBN,
    addNewBook,
    getBookById,
    borrowBook,
    returnBook,
    reserveBook,
    cancelReservation
}