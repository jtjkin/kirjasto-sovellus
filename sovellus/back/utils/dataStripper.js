const userData = (user) => {
    const safeUser = {
        loans: user.loans,
        reservations: user.reservations,
        returnRequests: user.returnRequests,
        admin: user.admin,
        canAddBooks: user.canAddBooks,
        role: user.role,
        id: user._id,
    }
    return safeUser
}

module.exports = {
    userData
}