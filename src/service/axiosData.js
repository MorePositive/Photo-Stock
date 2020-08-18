import axios from 'axios';

export default axios.create({
  baseURL: 'https://photo-stock-f3967.firebaseio.com/'
})