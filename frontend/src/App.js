import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SignupFormPage from './components/Signup'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import EventList from './components/EventList'
import CreateEventForm from './components/CreateEventForm'
import EditEventForm from './components/CreateEventForm'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={ isLoaded } />
      {isLoaded && (
        <Switch>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      )}
      <CreateEventForm />
      <EventList />
      <Route path='/events/:eventId'>
        <EditEventForm />
      </Route>
    </>
  )
}

export default App
