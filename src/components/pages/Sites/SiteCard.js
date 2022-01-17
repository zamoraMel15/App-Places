import React from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'

import './SiteCard.css'




const SiteCard = (props) => {

    return(
       
        <Col lg={4}>
        
           <div className='card'>

              <img src={props.imageUrl} alt='Foto de lugares' style={{ height: '300px', width: '350px', objectFit: 'cover',  borderRadius: '15px'}}/>
             
               <Link to={`/details/${props._id}`} style={{textDecoration: 'none'}}><h4>{props.name}</h4></Link>
           
           </div>
        
        </Col>
    )
}




export default SiteCard