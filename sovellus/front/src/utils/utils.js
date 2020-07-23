import booksService from '../services/booksService'
import userService from '../services/userService'
import infoService from '../services/infoService'


export const initServiceTokens = (token) => {
    booksService.setToken(token)
    userService.setToken(token)
    infoService.setToken(token)
}

export const pingServer = async () => {
    const pong = await userService.ping()
    //REMOVE console.log
    console.log(pong)
  }