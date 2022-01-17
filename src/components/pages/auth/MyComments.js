import React, { Component } from 'react'


import CommentService from '../../../services/comment.service'
import SiteService from '../../../services/site.service'

import BtnDetails from '../../utils/BtnDetails/BtnDetails'



class MyComments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userCommented: false,
            userComments: []
        }

        this.commentService = new CommentService()
        this.siteService = new SiteService()
    }

    componentDidMount() {

        this.findIfUserCommentd()
        
    }

    findIfUserCommentd() {

        this.commentService
        .getComments({author: {_id: this.props.user._id} })
        .then((response) => {
            if (response.data) {

                let commented = response.data

                commented.forEach(elm => {

                    this.siteService
                    .getOneSite(elm.site)
                    .then((response) => this.state.userComments.push({ site: response.data.name, comment: elm.commentBody, id: elm.site }))
                    .then(() => this.setState({userCommented: true}))
                    .catch(err => console.log(err))
                })
            }
        })
        .catch(err => console.log(err))

    }

    render() {

        return(
            
            <>
            
            {this.state.userCommented && <h3>Mis comentarios</h3>}

               {this.state.userComments && 

            <div>
            
            {this.state.userComments.map(elm =>
                
                <div key={elm.id} style={{fontWeight: '300', margin: '30px 0'}}>

                    <p style={{display: 'inline', marginRight: '30px', fontSize: '1.2em'}}>{elm.site}: <span style={{fontStyle: 'italic'}}>'{elm.comment}'</span></p><span><BtnDetails place={elm.id} /></span>
                
                </div>)}

            </div>}

            {!this.state.userCommented &&

            <div>Aún no te animas hacer ningun Comentario, ¡Comenta!</div>
             

            }
           
            </>
        )
    }
}





export default MyComments