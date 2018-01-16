import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { HashRouter , Route, Switch } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'

import Landing from './pages/landing'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'

import { logUser, logOut } from './actions'

import reducer from './reducers/user'
import { firebaseApp } from './firebase/index'

import './styles/index.css'
import 'antd/dist/antd.css'

firebaseApp.auth().onAuthStateChanged(user => {
  if (user){
    const { email } = user
    store.dispatch(logUser(email))
  } else {
    store.dispatch(logOut())
  }
})

const store = configureStore()
export default store

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </HashRouter>
  </Provider>, document.getElementById('root'))
registerServiceWorker()
