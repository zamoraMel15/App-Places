import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SiteService from '../../../../services/site.service'
import RatingService from '../../../../services/rating.service'
import CommentService from '../../../../services/comment.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import star from './star.png'

import './details.css'


const SiteDetails = (props) => {

    //Sites

    const siteService = new SiteService()

    const [site, setSite] = useState('')

    useEffect(() => { findSite() }, [])


    function findSite() {

        siteService
            .getOneSite(props.match.params.site_id)
            .then((response) => setSite(response.data))
            .catch(err => console.log(err))
    }

    //Rating

    const ratingService = new RatingService()

    const [ratings, setRatings] = useState('')
    
    const [ratingMedia, setRatingMedia] = useState(null)

    useEffect(() => { findRatings() }, [ratingMedia])

    function findRatings() {

        ratingService
            .getSiteRatings(props.match.params.site_id)
            .then((response) => {
                setRatings(response.data)

                let data = response.data
                let sum = 0

                data.map(elm => sum += elm.rating)

                if (data.length > 1) {
                    let media = sum / data.length
                    setRatingMedia(media.toFixed(1))
                
                } else {
                    let media = sum
                    setRatingMedia(media.toFixed(1))
                }
            })
            .catch(err => console.log(err))
        }

    //User
    
    const [userRating, setUserRating] = useState(null)
    
    useEffect(() => { findUserRating() }, [])

    function findUserRating() {

        ratingService
            .getSiteRatings(props.match.params.site_id)
            .then((response) => {
                let data = response.data
                data.map(elm => elm.author === props.loggedInUser._id ? setUserRating(elm.rating) : null)
            })
            .catch(err => console.log(err))
    }
    
    //Rating Form

    const [ratingValue, setRatingValue] = useState('')

    const [commentValue, setCommentValue] = useState('')

    const handleRatingChange = e => {

        const { value } = e.target

        setRatingValue(value)

        findRatings()
    }

    const handleSumbmit = e => {

        e.preventDefault()

        setUserRating(ratingValue)

        const newRating = { author: props.loggedInUser, rating: ratingValue, site}

        ratingService
            .saveRating(newRating)
            .then(() => findRatings())
            .catch(err => console.log(err))
    }
    
    //Comentarios

    const [comments, setComments] = useState('')
    
    const commentService = new CommentService()
   
    useEffect(() => { getComments()}, [])

    const getComments = () => {

        commentService
            .getSiteComments(props.match.params.site_id)
            .then((response => {
                setComments(response.data)
            }))
            .catch(err => console.log(err))
    }
    
    const handleCommentChange = e => {

        const { value } = e.target

        setCommentValue(value)
    }

    const handleSumbmitComment = e => {

        e.preventDefault()

        const newComment = { author: props.loggedInUser, site, commentBody: commentValue }

        commentService
            .saveComment(newComment)
            .then(() => getComments())
            .catch(err => console.log(err))

    }
    
    return(
        
        <Container>

            <section className='details'>
                
                <h1>{site.name}</h1>
           
                <h4 style={{textAlign: 'center'}}>'{site.description}'</h4>

                <Row style={{marginBottom: '5%' }}>

                    <Col lg={6}>

                        <img src={site.imageUrl} alt='sitios' />
                   
                    </Col>

                    <Col lg={4}>

                        {ratingMedia && <p>{ratingMedia}<img src={star} alt='star' style={{ width: '5%', height: '4%', objectFit: 'cover', marginLeft: '1%', marginBottom: '1%'}}></img></p>}
                       
                        {userRating && <p>Tu valoración: {userRating}</p>}

                         {!userRating && 
                        
                         <Form onSubmit={handleSumbmit} sytle={{marginBottom: '25px'}}>
                           
                           <Form.Group >
 
                              <Form.Control name='rating' type='number' max='5' min='0' placeholder="Puntua tu experiencia con un rango de 0 al 5" onChange={handleRatingChange}/>
   
                            </Form.Group>

                            <button className='formBtn' type="submit">Añadir Puntuación</button>
   
                        </Form>
                        
                    }
                     <p>Precio: {site.price}</p>
                    
                     {site.service && <p>Su ambiente: {site.service.join(', ')}</p>}

                     {site.phone && <p>Teléfono: {site.phone}</p>}

                     {site.email && <p>Email: {site.email}</p>}

                    </Col>

                </Row>

                <Row style={{marginBottom: '5%'}}>

                    <Col lg={1}></Col>

                    <Col lg={10} >
                        
                      
                    

                    
                    
                    </Col>
                
                </Row> 
                
                <Row>

                    <Col lg={12}>
                        
                        <h3 style={{marginBottom: '3%'}}>Comentarios</h3>

                        {!comments && <p style={{color: 'grey', fontStyle: 'italic'}}>¡Oh! Se el primer@ en dejar un comentarío de este establecimiento.</p>}
                        
                        {comments && comments.map(elm =>
                            
                            <div>

                               <h5 style={{fontStyle: 'italic'}}>{elm.author.username}: <span>{elm.commentBody}</span></h5>
                        
                            </div>

                        
                        )}

                        
                        <Form onSubmit={handleSumbmitComment} style={{marginTop: '3%'}}>
                           
                           <Form.Group >
 
                              <Form.Control name='comment' placeholder='Comparte tu experiencia' as='textarea' rows={5} onChange={handleCommentChange}/>
   
                            </Form.Group>

                            <button className='submitBtn' type='submit'>Publicar comentario</button>
   
                        </Form>
                    
                    </Col>
                
                </Row>
            
            </section>

            <Link to='/sites' style={{textDecoration: 'none'}} className='backButton'>Volver</Link>
        
        </Container>
    )
}

export default SiteDetails