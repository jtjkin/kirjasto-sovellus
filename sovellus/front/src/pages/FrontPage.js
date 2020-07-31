import React from 'react'
import { useSelector } from 'react-redux'

//components
import Announcement from '../components/Annoucement'
import BookList from '../components/bookComponents/BookList'
import Logout from '../components/smallComponents/Logout'
import LoadingIcon from '../components/smallComponents/LoadingIcon'


const FrontPage = () => {
    const user = useSelector(state => state.user)

    if (!user.id) {
        return (
            <div>
            <LoadingIcon />
            <Logout />
            </div>
        )
    }

    return (
        <div>
            <Announcement />

            <BookList 
                title='Hyllyyn saapuneet varaukset' 
                books={user.arrivedReservations}
                color='blue'/>

            <BookList 
                title='Voimassaolevat varaukset' 
                books={user.reservations}
                color='yellow'/>

            <BookList 
                title='Palautuspyynnöt' 
                books={user.returnRequests}
                color='red'/>

            <Logout />
        </div>
    )
}

export default FrontPage