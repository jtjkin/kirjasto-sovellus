import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

//styles
import './css/css-reset.css'
import './css/general-styles.css'
import './css/router-transitions.css'
import './css/web-size.css'

//pages
import FrontPage from './pages/FrontPage'
import Information from './pages/Information'
import SaveNew from './pages/SaveNew'
import SearchResults from './pages/SearchResults'
import PersonalInfo from './pages/PersonalInfo'
import UpdatePersonalInfo from './pages/UpdatePersonalInfo'
import Login from './pages/Login'
import NewUser from './pages/NewUser'
import ForgottenPassword from './pages/ForgottenPassword'
import SingleBookPage from './pages/SingleBookPage'
import Admin from './pages/Admin'

//components
import AppTitle from './components/AppTitle'
import SearchBar from './components/SearchBar'
import Menu from './components/Menu'
import ReturnNotice from './components/smallComponents/ReturnNotice'

//reducers
import { initToken } from './reducers/tokenReducer'
import { initUser } from './reducers/userReducer'
import { getBulletins } from './reducers/infoReducer'

//utils
import { initServiceTokens, pingServer } from './utils/utils'


const App = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    history.push('/')
    pingServer()
  }, [])  //eslint-disable-line

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      initServiceTokens(user.token)
      dispatch(initToken(user.token))
      dispatch(initUser())
      dispatch(getBulletins())

    }

  }, [dispatch])

  //Login
  const [newUser, setNewUser] = useState(false)
  const [forgottenPassword, setForgottenPassword] = useState(false)
  
  if (newUser === true) {
    return (
      <NewUser 
        setNewUser={setNewUser}
      />
    )
  }

  if (forgottenPassword === true) {
    return (
      <ForgottenPassword 
        setForgottenPassword={setForgottenPassword}
      />
    )
  }

  if (!token) {
    return (
      <Login 
        setForgottenPassword={setForgottenPassword}
        setNewUser={setNewUser}
      />
    )
  }

  //https://reactcommunity.org/react-transition-group/with-react-router
  //http://reactcommunity.org/react-transition-group/css-transition
  const routes = [
    {path: '/:id', Component: SingleBookPage},
    {path: '/lisaa-uusi', Component: SaveNew},
    {path: '/hakutulokset', Component: SearchResults},
    {path: '/omat-tiedot', Component: PersonalInfo},
    {path: '/admin', Component: Admin},
    {path: '/', Component: FrontPage},
  ]

  const noTransitionRoutes = [
    {path: '/paivita-tietoja', Component: UpdatePersonalInfo},
    {path: '/tietoja-sovelluksesta', Component: Information},
  ]

  return (
    <div>
      <ReturnNotice />
      <AppTitle />

        <div className='web-fix-container'>
          <div className='web-fix-menu'>
            <SearchBar />
            <Menu />
          </div>
        </div>

        {noTransitionRoutes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                <Component />
              </Route>
        ))}

        {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={600}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <Component />
                    </div>
                  </CSSTransition>
                )}
              </Route>
        ))}
      </div>
  );
}

export default App;
