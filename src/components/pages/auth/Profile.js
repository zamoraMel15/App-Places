import  { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MyComments from './MyComments'
import BtnBack from '../../utils/BtnBack/BtnBack'

import './Profile.css'

export default function Profile(props) {

    const [ratingsView, setRatingsView] = useState(null)

     const [commentsView, setCommentsView] = useState(null)

    
    const handleChangeRatings = () => {

        if (ratingsView) {
            
            setRatingsView(null)
        
        } else {
            
            setRatingsView(true)
        }
    }


     
    const handleChangeComments = () => {

        if (commentsView) {
            
            setCommentsView(null)
        
        } else {
            
            setCommentsView(true)
        }
    }


    return(

        <Container>

            <section className='profile'>

                <h1>Hola, Amig@ {props.loggedInUser.username}!</h1>

                <Row>

                   <Col lg={4}>
                   
                   <button className='profileBtn' onClick={handleChangeRatings}>Valoraciones</button>

                   <button className='profileBtn' onClick={handleChangeComments}>Comentarios</button>
                   
                   </Col>

                   <Col lg={8}>

                       {ratingsView && <MyComments user={props.loggedInUser} />}
                       
                       {commentsView && <MyComments user={props.loggedInUser} />}
                   
                   </Col>
               
               
               </Row>

               <Row>

                   <Col style={{marginTop: '80px'}}>

                        <BtnBack place={''} />

                  </Col>

               </Row>

            </section>

        </Container>
    
    )

}
 

      





    
  
 