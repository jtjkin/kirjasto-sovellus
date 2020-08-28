/*  data dublicated instead of using spread syntax
    to ensure that in case of adding new properties
    no new data is added to return object as well
*/

const userData = (user) => {
    const safeUser = {
        name: user.name,
        role: user.role,
        id: user.id
    }
    return safeUser
}

const bookDataWithBorrowerInfo = (book) => {
    let  safeBook = {
        author: book.author,
        id: book._id,
        title: book.title,
        status: book.status,
        publicationYear: book.publicationYear,
        publisher: book.publisher,
        authorsShort: book.authorsShort,
        reserver: book.reserver,
        borrowDate: book.borrowDate,
    }

    if (book.borrower) {
        safeBook.borrower = {
            id: book.borrower._id,
            name: book.borrower.name,
            role: book.borrower.role
        }
    }

    return safeBook
}

const bookShortList = (book) => {
    const safeBook = {
    title: book.title,
    authorsShort: book.authorsShort,
    publicationYear: book.publicationYear,
    status: book.status,
    id: book._id,
    }

    return safeBook
}


const reserverInfoRemover = (user) => {
    const safeReturnRequest = user.returnRequests.map(book => {
        const newReserverList = book.reserver.map(entry =>  {return {reserveDate: entry.reserveDate}})
        const newBook = book
        newBook.reserver = newReserverList
        return newBook
    })

    const safeUser = user
    safeUser.returnRequests = safeReturnRequest

    return user
}

const justNamesAndRolesList = (list) => {
    let newList = []

    list.forEach(entry => {
        newEntry = {
            id: entry.id,
            name: entry.name,
            role: entry.role
        }

        newList.push(newEntry)
    })

    return newList
}

module.exports = {
    userData,
    bookDataWithBorrowerInfo,
    bookShortList,
    reserverInfoRemover,
    justNamesAndRolesList
}