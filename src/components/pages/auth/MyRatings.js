import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import RatingService from '../../../services/rating.service'
import SiteService from '../../../services/site.service'

import BtnDetails from '../../utils/BtnDetails/BtnDetails'

import star from '../Sites/details/star.png'

class MyRatings extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            userRated: false,
            userRatings: []
        }

        this.ratingService = new RatingService()
       
        this.siteService = new SiteService()
    }

    componentDidMount() {

        this.findIfUserRated()
        
    }

    findIfUserRated() {

        this.ratingService
        .getRatings({author: this.props.user._id})
        .then((response) => {
            if (response.data) {

                let rated = response.data
                 rated.forEach(elm => {

                    this.siteService
                    .getOneSite(elm.site)
                    .then((response) => this.state.userRatings.push({ site: response.data.name, rating: elm.rating, id: elm.site }))
                    .then(() => this.setState({userRated: true}))
                    .catch(err => console.log(err))
                })
            }
        })
        .catch(err => console.log(err))

    }

    render() {

        return(
            
            <>
            
            {this.state.userRated && <h3>Mis valoraciones</h3>}

               {this.state.userRatings && 

            <div>
            
            {this.state.userRatings.map(elm =>
                
                <div key={elm.id} style={{fontWeight: '300', margin: '30px 0'}}>

                    <p style={{display: 'inline', marginRight: '30px', fontSize: '1.2em'}}>{elm.restaurant}: {elm.rating}<img src={star} alt='estrella' style={{ width: '2%', height: '3%', objectFit: 'cover', marginLeft: '0.5%', marginBottom: '0.5%' }} /></p><span><BtnDetails place={elm.id} /></span>
                
                </div>)}

            </div>}

            {!this.state.userRated &&

            <div>Aún no te animas ha puntuar ningún Café/Librería, ¡Puntua!</div>
             

            }
           
            </>
        )
    }
}





export default MyRatings