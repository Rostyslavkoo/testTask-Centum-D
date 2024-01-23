import requestService from '../requestService';
const prefix = 'NBUStatService/v1/statdirectory';
export default {
	async getExchange(params = {}) {
		const response = await requestService.get(`${prefix}/exchange`, params);

		return response?.data;
	},
};
