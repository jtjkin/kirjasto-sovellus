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
    /*
        @param: book {
            title: string,
            author: string,
            publicationYear: string or number,
            publisher: string
        }

        @return: {
            id: string,
            status: string,
            author: string,
            authorsShort: string,
            publicationYear: string,
            publisher: string,
            reserver: empty Array
        }
    */
    const response = await axios.post(`${bookRouteUrl}/add-book`, book, config)
    return response  
}

const updateBook = async (book) => {
    /*
        @param: book {
            title: string,
            author: string,
            publicationYear: string or number,
            publisher: string,
            id: string
        }

        @return: {
            id: string,
            status: string,
            author: string,
            authorsShort: string,
            publicationYear: string,
            publisher: string,
            reserver: Array {
                reserveDate: Date,
                userId: string,
                _id: string (not in use)
            }
        }
    */
    const response = await axios.post(`${bookRouteUrl}/update-book`, book, config)
    return response
}

const getBookById = async (id) => {
    /*
        @param: string

        @return: {
            id: string,
            status: string,
            author: string,
            authorsShort: string,
            publicationYear: string,
            publisher: string,
            reserver: Array {
                reserveDate: Date,
                userId: string,
                _id: string (not in use)
            },
            borrower: {
                id: string,
                name: string,
                role: string
            }
        }
    */

    const response = await axios.get(`${bookRouteUrl}/${id}`, config)
    return response.data
}

const borrowBook = async (id) => {
    /*
        @param: string

        @return: {
            updatedBook: {
                author: string,
                authorsShort: string,
                borrowDate: Date,
                borrower: {
                    id: string, 
                    name: string
                },
                id: string,
                publicationYear: string,
                publisher: string,
                reserver: Array {
                    reserveDate: Date,
                    userId: string,
                    _id: string (not in use),
                }
                status: string,
                title: string
            },
            updatedUser: {
                admin: true,
                arrivedReservations: Array {
                    authorsShort: string,
                    id: string,
                    publicationYear: string,
                    title: string,
                },
                id: string,
                loans: Array {
                    authorsShort: string,
                    id: string,
                    publicationYear: string,
                    title: string,
                },
                reservations: Array {
                    authorsShort: string,
                    id: string,
                    publicationYear: string,
                    title: string,
                },
                returnRequests: Array {
                    authorsShort: string,
                    id: string,
                    publicationYear: string,
                    reserver: Array {
                        reserveDate: Date,
                        userId: string,
                        _id: string (not in use),
                    },
                    title: string,
                },
                role: string
            }
        }
    */
    const response = await axios.post(`${bookRouteUrl}/borrow`, {id}, config)
    return response.data
}

const returnBook = async (id) => {
    /*
        @param: string

        @return: //Same as in borrowBook
    */
    const response = await axios.post(`${bookRouteUrl}/return`, {id}, config)
    return response.data
}

const reserveBook = async (id) => {
    /*
        @param: string

        @return: //Same as in borrowBook
    */
    const response = await axios.post(`${bookRouteUrl}/reserve`, {id}, config)
    return response.data
}

const cancelReservation = async (id) => {
    /*
        @param: string

        @return: //Same as in borrowBook
    */
    const response = await axios.post(`${bookRouteUrl}/cancel-reservation`, {id}, config)
    return response.data
}

export default {
    searchBooks,
    setToken,
    searchISBN,
    addNewBook,
    updateBook,
    getBookById,
    borrowBook,
    returnBook,
    reserveBook,
    cancelReservation
}