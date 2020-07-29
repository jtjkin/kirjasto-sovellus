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

const getAll = async () => {
    const  response = await axios.get(bookRouteUrl, config)
    return response.data
}

const searchISBN = async (isbn) => {
    const response = await axios.post(`${bookRouteUrl}/search-isbn`, {isbn}, config)
    return response.data
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

export default {
    getAll,
    setToken,
    searchISBN,
    addNewBook,
    getBookById,
    borrowBook,
    returnBook,
    reserveBook
}