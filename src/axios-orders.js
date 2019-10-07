import axios from 'axios';

const instance = axios.create({
  baseURL:'https://burger-project-b6bde.firebaseio.com/'
});
export default instance;