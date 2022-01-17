import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './BtnBack.css'

const BtnBack = ({place}) => {

    return (
       
        <>

           <Link to={`/${place}`} className='buttonBack'>Regresar</Link>
       
        </>
    )
}





export default BtnBack