import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../../layout/Navbar'
import Index from '../index/Index'
import Sites from '../Sites/Sites'
import SiteDetails from '../Sites/details/SiteDetails';
import Profile from '../auth/Profile'
import Signup from '../signup/Signup';
import Login from '../login/Login'

import Alert from '../../utils/alert/Alert'
import AuthService from '../../../services/auth.service';

import './App.css';


class App extends Component{
      constructor() {
        super()
        this.state = {
          loggedInUser: undefined,
          endpoint: 'localhost:5000',
        }

        this.authService = new AuthService()
      }

    componentDidMount = () => {

      this.fetchUser()
    
    }

    setTheUser = user => this.setState({  loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))

    fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null}))
  }

  render() {
   
   return (
      <>
        <Navigation setTheUser={this.setTheUser}  loggedInUser={this.state.loggedInUser}/>
    
       
            <Switch>
                
                <Route path='/' exact render={() => <Index />}/>
                <Route path='/sites' exact render={(props) => <Sites loggedInUser={this.state.loggedInUser} {...props} />}/>
                <Route path='/details/:site_id' render={(props) => this.state.loggedInUser ? <SiteDetails loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to='/login' />}/>
                <Route path='/profile'  render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to='/login' />}/>
                <Route path='/signup' render={props => <Signup setTheUser={this.setTheUser} {...props} />}/>
                <Route path='/login' render={props => <Login   setTheUser={this.setTheUser}  {...props} />}/>

            </Switch>

            <Alert />
        </>
   )
 }
}

export default App
