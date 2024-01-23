import requestService from '../requestService';
const prefix = 'NBUStatService/v1/statdirectory';
export default {
	async getExchange(params = {}) {
		const response = await requestService.get(`${prefix}/exchange`, params);
		if(response?.data[0]?.message){
			return []
		}
		return response?.data;
	},
};
