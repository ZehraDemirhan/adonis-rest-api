import axios from 'axios';

export const HttpClientAuth = axios.create({
	baseURL: 'http://localhost:3333',
	headers: {
		'Content-Type': 'application/json',
	}
});

HttpClientAuth.interceptors.request.use(
	(config) => {
		// Retrieve token from sessionStorage (or any other storage you are using)
		const token = sessionStorage.getItem('token');
		
		// If token exists, add Authorization header
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		console.error('Request error:', error);
		return Promise.reject(error);
	}
);


HttpClientAuth.interceptors.response.use(
	(response) => {
		// Modify or log the response if necessary
		return response;
	},
	(error) => {
		// Handle response errors
		if (error.response && error.response.status === 401) {
			console.error('Unauthorized! Redirecting to login...');

			
			sessionStorage.removeItem('token');
			window.location.href = '/login';
		}
		console.error('Response error:', error.response);
		return Promise.reject(error);
	}
);


export const HttpClientPublic = axios.create({
	baseURL: 'http://localhost:3333',
	headers: {
		'Content-Type': 'application/json',
	}
});
