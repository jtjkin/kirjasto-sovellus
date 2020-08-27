import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ReturnNotice = () => {
    const usersBooks = useSelector(state => state.user.returnRequests)
    const [dismissedMessage, setDismissedMessage] = useState(false)

    const currentDate = new Date()

    let booksToReturn = []

    if (usersBooks) {
        usersBooks.forEach(book => {
            const isOld = Date.parse(currentDate) - Date.parse(book.reserver[0].reserveDate) - 1209600000
            if (!isOld) {
                booksToReturn.push(book)
            }
        })
    }

    const removeNotification = () => {
        setDismissedMessage(true)
    }

    if (dismissedMessage === true || booksToReturn.length === 0) {
        return null
    }

    return (
        <div className='overlay'>
                <button className='overlay-button' onClick={removeNotification}>X</button>
                <h4>Seuraaviin teoksiin on ollut varaus yli 2 viikkoa. 
                    Kenties olisi jo aika palauttaa?
                </h4>

                <div className='overlay-books'>
                {booksToReturn.map(book => 
                    <div key={book.id}>{book.authorsShort}, {book.publicationYear}. {book.title}
                    </div>
                )}
                </div>
        </div>
    )
}

export default ReturnNotice