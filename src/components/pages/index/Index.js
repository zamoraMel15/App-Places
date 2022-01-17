import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

import cafe from './img/cafe.png'
import star from './img/star.png'
import coment from './img/coment.png'

import Video from './video'

import './Index.css'


class Index extends Component {

// componentDidMount() {

//     window.addEventListener('scroll', this.onScroll)

// }


// onScroll() {

//     const isInViewport = elm => {
//         const rect = elm.getBoundingClientRect()
//         const vertInView = (rect.top <= window.innerHeight - window.innerHeight / 2) && ((rect.top + rect.height) >= 0)
//         return (vertInView)
//     }

//     const sect = document.querySelector('.sec3')

// if (isInViewport(sect)) {
//         document.querySelector('.sec3').classList.add('#8FBC8F')
//     } else {
//         document.querySelector('.sec3').classList.remove('#8FBC8F')
        
//     }
// }


    render(){
        
        return(
            
            <Container fluid style={{ padding: '0' }}>

                <section className='sec1'>

                    <p className='paragraph white'>Todo lo que buscas</p>

                </section>

                <section className='sec2'>
                    
                    <Row className='justify-content-center'>
                     
                     <Col lg={3}>
                     
                     <article className='article'>

                         <img src={cafe} alt='logo cafe' className='logo' />

                         <h3>Lectura y Café</h3>

                         <p>Descubre nuevos Cafés y librería</p>

                     </article>
                    
                    </Col>

                    <Col lg={3}>
                     
                     <article className='article'>

                         <img src={star} alt='logo star' className='logo'/>

                         <h3>Puntuación</h3>

                         <p>Dale valor a tu experiencia</p>

                     </article>
                    
                    </Col>

                    <Col lg={3}>
                     
                     <article className='article'>

                         <img src={coment} alt='logo coment'  className='logo'/>

                         <h3>Comenta</h3>

                         <p>Comparte con miles de personas</p>

                     </article>
                    
                    </Col>
                    
                 </Row>

                </section>

                <section className='sec3'>

                    <Fade>

                        <Row>
                            
                            <Col lg={6}>
                               
                               <Video />
                            
                            </Col>
                            
                            <Col lg={6}>
                               
                               <p className='paragraph blank'>Descubre un mundo de buenos libros y olores</p>
                            
                            </Col>
                            
                        </Row>
                   
                    </Fade>

                </section>

                <section className='sec2'>

                    <Row className='justify-content-center'>

                        <Col lg={5}>

                            <h2>¿Todavía no eres un Café y libros?</h2>
                        
                        </Col>

                        <Col lg={4}>

                            <div className='buttons'>
                                 
                                 <Link to='/signup' style={{ textDecoration: 'none'}}  className='whiteBtn'>Inicia sesión</Link>

                                 <Link to='/login'  style={{ textDecoration: 'none'}} className='yellowBtn'>Registrate</Link>
                            
                            </div>
                        
                        </Col>

                    </Row>

                </section>

                <section className='sec4'>

                    <h4>Contacta con nosotros</h4>
                
                </section>

              
            
            </Container>
        )
    }
}






export default Index