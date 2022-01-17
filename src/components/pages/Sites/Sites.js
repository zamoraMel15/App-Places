import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SiteService from '../../../services/site.service'

import NewSite from './newSite/NewSite'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'

import SiteCard from './SiteCard'

import tazaCafe from './tazaCafe.png'

import './Sites.css'

class Sites extends Component {

    constructor(props) {
        
        super(props)
        this.state = { 
            sites: [],
            showModal: false,
            showList: false,
        }
        
        this.siteService = new SiteService()
    }

    componentDidMount = () => this.loadSites()

    

    loadSites = () => {
      
        this.siteService
            .getAllSites()
            .then(response => { this.setState({ sites: response.data }) })
            .catch(err => console.log('Error:', err))
    }

    handleModal = showModal => this.setState({ showModal })

    render() {
      
        return(
          <>
            <Container>

                <section className='index'>

                    <h1>Todos los cafés y Librerías</h1>
                
                {this.props.loggedInUser && <div style={{minHeight: '80px'}}><br />

                      {this.props.loggedInUser.role === 'user' && <Link onClick={() => this.handleModal(true)} style={{textDecoration: 'none', height:'100%'}} className='linkadmin'>Añade un nuevo Café Librerías</Link>}
                      
                    </div>}
               
                </section>

                <section className='list'>
    
                    <Row>
                       
                       {this.state.sites.map(elm => <SiteCard  key={elm.id} {...elm}/>
                      
                        
                        )} 
                    </Row>
                </section>

            </Container>

         <Modal size='lg' show={this.state.showModal} onHide={() => this.handleModal(false)}>
            
            <Modal.Header closeButton>

                <img src={tazaCafe} alt='logo' className='logImg'/>
            </Modal.Header>
            
            <Modal.Body>
                  
                  <NewSite closeModal={() => this.handleModal(false)} refreshList={this.loadSites}/>
            
            </Modal.Body>
            
        </Modal>
    </>
        )
    }
}









export default Sites