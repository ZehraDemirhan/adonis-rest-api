import axios from 'axios';

import { HttpClientAuth } from '../utils/httpClient';

export default class AuthService {
	constructor(baseURL) {
		this.api = axios.create({
			baseURL,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	async login(email, password) {
		try {
			const response = await this.api.post('/login', { email, password });
			sessionStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error) {
			throw error.response ? error.response.data : error;
		}
	}

	async register(email, password) {
		try {
			const response = await this.api.post('/register', { email, password });
			return response.data;
		} catch (error) {
			throw error.response ? error.response.data : error;
		}
	}

	async logout() {
		try {
			await HttpClientAuth.delete('/logout');
			sessionStorage.removeItem('token');
		} catch (error) {
			throw error.response ? error.response.data : error;
		}
	}
}
