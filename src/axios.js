import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-b81ee.firebaseio.com/'
});

export default instance;
