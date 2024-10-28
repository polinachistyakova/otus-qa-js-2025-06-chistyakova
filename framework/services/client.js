import axios from 'axios'
import config from '../config/configDummyjson'

const clientDummyjson = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

export default {
  clientDummyjson
}
