 import React, { Component } from 'react'

 import Form from 'react-bootstrap/Form'
 import Container from 'react-bootstrap/Container'
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'

import AuthService from '../../../services/auth.service'


import './Signup.css'

class Signup extends Component {
     constructor(props) {
         super(props)
         this.state = {
             username: '',
             password: ''
        }
        
        this.authService = new AuthService()

        
    }

    handleInputChange = e => {
       
        e.preventDefault()
       
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

         this.authService
             .signup(this.state)
             .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/profile') //
            }) 
           .catch(err => console.log('Errooor:', { err }))
    }


    render() {
        
        return(
           
            <Container>
            
            <section className='signupPage'>
            
                <h1>Crea tu cuenta</h1>
            
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
                
                               <button className='signupBtn' type='submit'>Registrarme</button>

                        </Form>
                
                    </Col>
                
                </Row>
                
            </section>

        </Container>
        )
    }

}


 export default Signup

