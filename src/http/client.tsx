import axios from 'axios'
import message from '../lib/message'
const baseURL = 'https://fd9b10f6-6863-4898-962b-cdd165d2cdfb.bspapp.com'

const client = axios.create({
  baseURL,
  timeout: 5000
})

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})

client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  message.error('网络出问题了')
  console.log(error)
  return Promise.reject(error);
});

export default client