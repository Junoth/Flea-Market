import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/layout/Landing';
import About from './components/layout/About';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/Edit-Profile/EditProfile';
import CreateProfile from './components/Create-Profile/CreateProfile';
import Home from './components/home/Home';
import CreateItem from './components/Create-Item/CreateItem';
import CreateItemPhotos from './components/Create-Item/CreateItemPhotos';
import EditItem from './components/Edit-item/EditItem';
import Item from './components/item/Item';
import User from './components/user/User';
import Items from './components/items/Items';
import Result from './components/search/Result';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import 'react-image-lightbox/style.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile);
    // Redirect to Login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
              <Navbar />
              <Route exact path='/' component={ Landing } />
              <Route exact path='/about' component={ About } />
              <Route exact path='/login' component={ Login } />
              <Route exact path='/register' component={ Register } />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
              </Switch>
              <Route exact path='/home' component={ Home } />
              <Switch>
                <PrivateRoute exact path='/create-item' component= { CreateItem } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/create-item/photos/:id' component={ CreateItemPhotos } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-item/:id' component={ EditItem } />
              </Switch>
              <Route exact path='/item/:id' component={ Item } />
              <Route exact path='/user/:id' component={ User } />
              <Route exact path='/items' component={ Items } />
              <Route exact path='/results' component={ Result } />
              <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
