import React, { Component } from 'react'

import Toast from 'react-bootstrap/Toast'

class Alert extends Component  {

    constructor() {
        super()
        this.state = {
            visible: true
        }
    }
  
    render() {

    return(
        
        <Toast style={{ position: 'fixed', left: '10px', bottom: '10px', width: '300px' }} show={this.state.visible} onClose={() => this.setState({ visible: false})} delay={3000} autohide>
            <Toast.Header> <p className="mr-auto">Café y Libros</p> </Toast.Header>
            <Toast.Body></Toast.Body>
        </Toast>
    )
  }
}






export default  Alert 