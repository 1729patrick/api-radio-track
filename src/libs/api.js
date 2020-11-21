import axios from 'axios';

const api = axios.create({
	baseURL: 'https://openradio.app',
});

export default api;
