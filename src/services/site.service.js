import axios from 'axios'



export default class SiteService  {
   
  constructor() {
     this.api = axios.create({
        baseURL: 'http://localhost:5000/api'
    })
  }

  getAllSites = () => this.api.get('/getAllSites')
  getOneSite = id => this.api.get(`/getOneSite/${id}`)
  saveSite = site => this.api.post('newSite', site)
  updateSite = (id, site) => this.api.put(`/editSite/${id}`, site)
  deleteSite = (id) => this.api.get(`/${id}/delete`)
}