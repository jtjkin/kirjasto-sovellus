import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

//styles
import './css/css-reset.css'
import './css/general-styles.css'

//pages
import FrontPage from './pages/FrontPage'
import Information from './pages/Information'

const App = () => {
  //REMOVE

  useEffect(() => {
    //TODO
    //ping server -käynnistä mahdollisimman nopeasti, jotta
    //halpaversio ei jarruta käyttökokemusta
  }, [])

  //TODO
  //kirjautumissivu

  return (
    <div>
      <Switch>
        <Route path='/tietoja-sovelluksesta'>
          <Information />
        </Route>
        <Route path='/'>
          <FrontPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
