import axios from 'axios';

export default axios.create({
  baseURL: `https://apertum-interview.herokuapp.com/api/`
});