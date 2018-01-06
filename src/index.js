import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { HashRouter , Route, Switch } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'

import Landing from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';

import './styles/index.css';



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
  </Provider>, document.getElementById('root'));
registerServiceWorker();
