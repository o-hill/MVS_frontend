import axios from 'axios'
window.axios = axios

const BASE_URL = 'http://127.0.0.1:1496'

export default {

  getStatic(resourceName) {
    let url = BASE_URL + '/' + resourceName + '?' + param + '=' + val
    return axios.get(url)
  },

  queryResource (resourceName, param, val) {
    var url = BASE_URL + '/' + resourceName + '?' + param + '=' + val
    return axios.get(url)
  },

  getResource (resourceName, id) {
    var url = BASE_URL + '/' + resourceName + '/' + id
    return axios.get(url)
  },

  listResource (resourceName) {
    var url = BASE_URL + '/' + resourceName
    return axios.get(url)
  },

  deleteResource (resourceName, id) {
    var url = BASE_URL + '/' + resourceName + '/' + id
    return axios.delete(url)
  },

  postResource (resourceName, data) {
    var url = BASE_URL + '/' + resourceName
    return axios.post(url, data)
  },

  postNestedResource (parentResource, parentId, childResource, data) {
    var url = BASE_URL + '/' + parentResource + '/' + parentId + '/' + childResource
    return axios.post(url, data)
  },

  listNestedResource (parentResource, parentId, childResource) {
    var url = BASE_URL + '/' + parentResource + '/' + parentId + '/' + childResource
    return axios.get(url)
  },

  putResource (resourceName, data) {
    var url = BASE_URL + '/' + resourceName + '/' + data._id
    return axios.put(url, data)
  },

  streamResource (resourceName, data) {
    var url = BASE_URL + '/' + resourceName + '/' + data.id
    url += '/stream'
    url += '?' + 'elapsedTime=' + data['elapsedTime']
    return axios.get(url, data)
  },

  getHistory (resourceName, data) {
    var url = BASE_URL + '/' + resourceName + '/' + data.id
    url += '/history'
    return axios.get(url, data)
  },

  postFiles (resourceName, data) {
    var url = BASE_URL + '/' + resourceName
    let formData = new FormData()

    for (let file = 0; file < data.length; ++file) {
      formData.append('videos', data[file])
    }
    return axios.post(url, formData)
  }

}
