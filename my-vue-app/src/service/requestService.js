import axios from 'axios';
const API_ENDPOINT = 'https://bank.gov.ua/';
export default {
	get(url, params = {}, headers = {}, errorNotify = true) {
		return axios
			.get(API_ENDPOINT + url, {
				params: { json: true, ...params },
				headers,
			})
			.catch(error => {
				console.error(error);
			});
	},
};
