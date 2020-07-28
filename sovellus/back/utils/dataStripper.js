const userData = (user) => {
    /*  data dublicated instead of using spread syntax
        to ensure that in case of adding new properties
        no new data is added to return object as well
    */
    const safeUser = {
        loans: user.loans,
        reservations: user.reservations,
        returnRequests: user.returnRequests,
        admin: user.admin,
        canAddBooks: user.canAddBooks,
        role: user.role,
        id: user._id,
    }

    //TODO
    //jos ei tarvita variaatioita fronttiin, vaihda tämä modelin datastripperiin
    return safeUser
}

const bookData = (book) => {
    /*  data dublicated instead of using spread syntax
        to ensure that in case of adding new properties
        no new data is added to return object as well
    */
    const safeBook = {
        id: book._id,
        title: book.title,
        authorsShort: book.authorsShort,
        author: book.author,
        publicationYear: book.publicationYear,
        publisher: book.publisher,
        status: book.status,
        borrower: book.borrower,
        reserver: book.reserver
    }
    return safeBook
}

const bookShortList = (book) => {
    /*  data dublicated instead of using spread syntax
        to ensure that in case of adding new properties
        no new data is added to return object as well
    */
    const safeBook = {
    title: book.title,
    authorsShort: book.authorsShort,
    status: book.status
    }

    return safeBook
}

module.exports = {
    userData,
    bookData,
    bookShortList
}