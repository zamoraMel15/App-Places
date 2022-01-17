import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './BtnDetails.css'

const BtnDetails = ({place}) => {

    return (
       
        <>

           <Link to={`/details/${place}`} className='buttonDetails'>Ver Lugares</Link>
       
        </>
    )
}





export default BtnDetails