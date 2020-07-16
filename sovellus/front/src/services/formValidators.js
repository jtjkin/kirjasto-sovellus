
const PasswordValidator = ({newPassword, confirmPassword}) => {
    //true === valid

    if (newPassword !== confirmPassword) {
        alert('Salasanat eivät täsmää! ')
        return false
    }

    if (newPassword === '' || 
        confirmPassword === '' ||
        newPassword === undefined ||
        confirmPassword === undefined) {
        alert('Salasana ei voi olla tyhjä ja sen täytyy olla vähintään 8 merkkiä pitkä.')
        return false
    }

    if (newPassword.length < 8 ) {
        alert('Salasanan on oltava vähintään 8 merkkiä pitkä.')
        return false
    }

    return true
}

export default {
    PasswordValidator
}