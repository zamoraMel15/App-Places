import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'



import SiteService from '../../../../services/site.service'
import FileService from '../../../../services/file.service'

import './NewSite.css'

class NewSite extends Component {

   
    constructor(props) {
        super(props)
       
        this.state = {
           
            site: {
                name: '',
                price: '',
                service: [],
                description: '',
                address: '',
                email: '',
                phone: '',
                imageUrl: ''
            },

            uploadingImage: ''
        }
        this.fileService = new FileService()
        this.siteService = new SiteService()
    }

    handleInputChange = e => {

        const { name, value } = e.target
        this.setState({site: {...this.state.site, [name]: value } })
    
    }

    handleCheckbox = e => {

        const target = e.target;
        const name = target.name
        const service = this.state.site.service
        const newService = [...service, name]
        this.setState({ site: { ...this.state.site, service: newService }})
    }

    handleImageUpload = e => {
        
        this.setState({ uploadingImage: true})
        const uploadData = new FormData()

        uploadData.append('imageUrl', e.target.files[0])

        this.fileService
            .uploadImage(uploadData)
            .then(response => this.setState({
                site: { ...this.state.site, imageUrl: response.data.secure_url },
                uploadingImage: false
            }))
            .catch(error => console.log('Error', error))
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.siteService
            .saveSite(this.state.site)
            .then(() => {
                this.props.closeModal()
                this.props.refreshList()
                this.props.history.push('/sites')
            })
            .catch(err => console.log(err))
    }

    
    render() {

        return (
         <>
           
            <Form onSubmit={this.handleFormSubmit}>
            
                      <Form.Group as={Col} controlId="name">

                           <Form.Label className='label'>Nombre del sitio</Form.Label>

                           <Form.Control name='name' onChange={this.handleInputChange}/>

                       </Form.Group>
            
                      <Form.Group controlId="price">

                            <Form.Label className='label side'>Precio</Form.Label>

                            <Form.Control name='price' as="select" onChange={this.handleInputChange}>

                                  <option>Elige</option>
                       
                                  <option>€</option>

                                  <option>€€</option>

                                  <option>€€€</option>

                                 <option>€€€€</option>

                            </Form.Control>

                       </Form.Group>
            
                     <Form.Group as={Col} controlId="servicio" >

                         <Form.Label className='label'>Tipo de servicio</Form.Label><br></br>

                            <Form.Check inline type="checkbox" label="Café" name='cafe' onChange={this.handleCheckbox} />
                            <Form.Check inline type="checkbox" label="Librería" name='libros' onChange={this.handleCheckbox}/>
                            <Form.Check inline type="checkbox" label="Ambos" name='ambos' onChange={this.handleCheckbox}/>
                
                     </Form.Group>

                    <Form.Group controlId="description">

                           <Form.Label className='label'>Descripción</Form.Label>

                           <Form.Control name='description' as="textarea" rows={3} onChange={this.handleInputChange}/>

                    </Form.Group>

                   
                    <Form.Group as={Col} controlId="email">

                           <Form.Label className='label'>Email</Form.Label>

                          <Form.Control name='email' type="email" onChange={this.handleInputChange}/>

                    </Form.Group>
 
                    <Form.Group as={Col} controlId="phone">

                           <Form.Label className='label'>Teléfono</Form.Label>

                           <Form.Control name='phone' onChange={this.handleInputChange}/>

                     </Form.Group>

                <Form.Group controlId="image">

                    <Form.Label className='label'>Seleccionar imagen</Form.Label>

                    <Form.Control name='imageUrl' type='file' onChange={this.handleImageUpload} />
                        
                </Form.Group> 

                  <button className='tealBtn' disabled={this.state.uploadingImage} type='submit' onClick={this.handleFormSubmit}>{this.state.uploadingImage ? 'Añadiendo...' : 'Añadir'}</button>

            </Form>
                
        </>
        )
  
    }
  
}


export default NewSite