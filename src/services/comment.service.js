import axios from 'axios'

export default class CommentService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getComments = () => this.api.get('/getComments')
    getSiteComments = id => this.api.get(`/getSiteComments/${id}`)
    saveComment = comment => this.api.post('newComment', comment)
    editComment = (id, comment) => this.api.put(`/editComment/${id}`)
    deleteComment = (id) => this.api.get(`/${id}/delete`)
}