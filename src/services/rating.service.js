import axios from 'axios'

export default class RatingService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getRatings = () => this.api.get('/getRatings')
    getSiteRatings = id => this.api.get(`/getSiteRatings/${id}`)
    saveRating = rating => this.api.post('newRating', rating)
    editRating = (id, rating) => this.api.put(`/editRating/${id}`, rating)
    deleteRating = (id) => this.api.get(`/${id}/delete`)
}