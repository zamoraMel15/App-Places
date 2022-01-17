import React, { Component }from 'react'

import { Link } from 'react-router-dom'


import Navbar from 'react-bootstrap/Navbar'

import AuthService from '../../services/auth.service'


import './Navbar.css'


class  Navigation extends Component  {

    constructor(props) {
       super(props)
       
      this.authService = new AuthService()
   }
   
   logoutUser = () => {
     
      this.authService
      .logout()
      .then(() => this.props.setTheUser(null))
      .catch(err => console.log('ERRORR!!', err))
   }
   
   render() {
      
      return(
     
         <Navbar className='nav' bg="dark" >
             
             <Link to='/' className='navlink' style={{textDecoration: 'none'}}>
                 
                 <h1>Cafés y Libros</h1>
            
             </Link>
             
             <div>
               
               <Link to='/sites' className='navlink'  style={{textDecoration: 'none'}}>Lugares</Link>
               {!this.props.loggedInUser && <Link to='/login' className='navlink' style={{textDecoration: 'none'}}>Entra</Link>}
               {!this.props.loggedInUser && <Link to='/signup' className='navlink' style={{ textDecoration: 'none' }}>Regístrate</Link>}
               {this.props.loggedInUser && <Link to='/profile' className='navlink' style={{ textDecoration: 'none' }}>Perfil</Link>}
               {this.props.loggedInUser && <div  className='navlink ' style={{display: 'inline'}} onClick={this.logoutUser} >Cierra sesión</div>}
             
             </div>
         
          </Navbar>
       )

   }
   
}



export default Navigation