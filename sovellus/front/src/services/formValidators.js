import { requireInstitutionEmail, InstitutionEmail } from '../constants'

const useValidator = () => {

const PasswordValidator = ({newPassword, confirmPassword}) => {
    //true === valid

    if (newPassword !== confirmPassword) {
        alert('Salasanat eivät täsmää! ')
        return false
    }

    if (!newPassword || !confirmPassword) {
        alert('Salasana ei voi olla tyhjä ja sen täytyy olla vähintään 8 merkkiä pitkä.')
        return false
    }

    if (newPassword.length < 8 ) {
        alert('Salasanan on oltava vähintään 8 merkkiä pitkä.')
        return false
    }

    return true
}

//s-postin validointi loppuun
const validateEmail = ({email, setPage, setEmail}) => {

    if (!email) {
        alert('Sähköpostiosoite on pakollinen tieto')
        setPage(0)
        return false
    }

    if (requireInstitutionEmail) {
        if (email.toLowerCase().indexOf(InstitutionEmail) === -1) {
            alert(`Sähköpostiosoitteen on oltava ${InstitutionEmail} -muotoinen osoite`)
            setPage(0)
            setEmail('')
            return false
        }
    }
    
    return true
}

//TODO
//Lisää rekisteröinnin validoinnit
const validateRegistration = (props) => {
    if (!props.joinCode) {
        alert('Anna liittymiskoodi')
        props.setPage(0)
        return false
    }

    if (!props.name) {
        alert('Nimi ei voi olla tyhjä tieto')
        props.setPage(0)
        return false
    }

    const validatedEmail = validateEmail(
        {
            email: props.email,
            setEmail: props.setEmail, 
            setPage: props.setPage
        })
    if (validatedEmail === false) {
        props.setPage(0)
        return false
    }

    const validatedPassword = PasswordValidator(
        {
            newPassword: props.newPassword,
            confirmPassword: props.confirmPassword
        }
    )

    if (validatedPassword === false) {
        props.setNewPassword('')
        props.setConfirmPassword('')
        props.setPage(1)
        return false
    }

    return true
}


return {
    PasswordValidator,
    validateRegistration
}
}

export default useValidator