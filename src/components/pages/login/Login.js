import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import authService from '../../../services/auth.service'


import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            message: undefined
       }
       
       this.authService = new authService()
   }

   componentDidMount() {
       
}

  
    handleInputChange = e => {
       const { name, value } = e.target
       this.setState({ [name]: value })
   }

   

   handleFormSubmit = e => {

       e.preventDefault()

       if (this.state.username.length > 0 && this.state.password.length > 0) {

        this.authService
        .login(this.state)
        .then(response => {

            this.setState({ message: response })
            this.props.setTheUser(response.data)

            this.props.history.push('/profile')
        })
        .catch(err => console.log('Erroooor:', { err }))
       
    }
    else {
        if (this.state.username.length < 1 && this.state.password.length < 1) {
            let value = 'campos vacios'
            this.setState({ message: value })
        }
        else if (this.state.username.length < 1) {
            let value = 'introduzaca su usuario'
            this.setState({ message: value })
        
        }else {
            let value = 'introduzca su contraseña'
            this.setState({ message: value })
        }
    }
}


   render() {
       
       return(
          
           <Container>
           
           <section className='loginPage'>
           
               <h1>Bienvenido, Cafe y libros!</h1>
           
               <Row>
               
                   <Col>
           
                       <Form onSubmit={this.handleFormSubmit}>

                               <Form.Group>

                                   <Form.Label>Nombre de usuario</Form.Label>

                                   <Form.Control type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
                   
                               </Form.Group>

                               <Form.Group>

                                   <Form.Label>Contraseña</Form.Label>

                                   <Form.Control  type='password' name='password' value={this.state.password}  onChange={this.handleInputChange}/>
                   
                               </Form.Group>
        
                             
                               <button className='loginBtn' type='submit'>Entrar</button>

                       </Form>
               
                   </Col>
               
               </Row>
               
           </section>

       </Container>
       )
   }

}


export default Login

