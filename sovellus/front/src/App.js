import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import $ from 'jquery'

//styles
import './css/css-reset.css'
import './css/general-styles.css'
import './css/router-transitions.css'

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

//components
import AppTitle from './components/AppTitle'
import SearchBar from './components/SearchBar'
import Menu from './components/Menu'

//reducers
import { initBooks } from './reducers/bookReducer'


const App = () => {
  const [location, setLocation] = useState('frontpage')
  const dispatch = useDispatch()
  const history = useHistory()

    //TODO kevennä taustakuvan kokoa
    //TODO tarkista onko kirjautumistiedot cachessa

  useEffect(() => {
    /* OTA KÄYTTÖÖN KUN DEV VALMIS */
    //history.push('/')

    //ping, käynnistä serveri

    dispatch(initBooks())
    //TODO
    //dispatch henkilön varaukset, saapuneet ja palautuskehoitukset
    //dispatch tiedotteet

  }, [dispatch])

  //jQuery

  
  useEffect(() => {

      $('.hover').hover(function() {
          $(this).find('div.menubar').animate(
            {
              height: '+=10px',
              paddingTop: '+=1px'
            }, 200)
      }, function() {
            $(this).find('div.menubar').animate(
              {
                height: '-=10px',
                paddingTop: '-=1px'
              }, 200)      
      }) 

      //REMOVE
      //Buttoni täytyy hoitaa reactilla
      $('button').click(function() {
        $(this).animate(
          {
            width: '-=160px',
            letterSpacing: '-=14px'
          }, 200, function () {
            $(this).css({display: 'none'})
          })})

  }, []) //eslint-disable-line

  
  useEffect(() => {
    const idList = [
      'frontpage',
      'save-new',
      'search',
      'info'
    ]
    $(`#${location} a`).css({color: 'rgb(121, 212, 168)'})

    idList.forEach(id => {
      if(id !== location) {
        $(`#${id} a`).css({color: 'rgb(250, 250, 250)'})
      }
    })
  }, [location])
  

  history.listen((location) => {
    if (location.pathname === '/') {
      setLocation('frontpage')
    }
    if(location.pathname === '/lisaa-uusi') {
      setLocation('save-new')
    }
    if(location.pathname === '/hakutulokset') {
      setLocation('search')
    }
    if (location.pathname === '/omat-tiedot') {
      setLocation('info')
    }
  })

  //LOGIN

  //TODO
  //ohittaa pääsyn tietoja-sovelluksta sivulle, korjaa

  const [newUser, setNewUser] = useState(true)
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

  //TODO
  //tarkista onko token tallennettu
  if (true) {
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
    {path: '/lisaa-uusi', Component: SaveNew},
    {path: '/hakutulokset', Component: SearchResults},
    {path: '/omat-tiedot', Component: PersonalInfo},
    {path: '/', Component: FrontPage},
  ]

  const noTransitionRoutes = [
    {path: '/paivita-tietoja', Component: UpdatePersonalInfo},
    {path: '/tietoja-sovelluksesta', Component: Information},
  ]

  return (
    <div>
      <AppTitle />
      <SearchBar />
      <Menu />

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
