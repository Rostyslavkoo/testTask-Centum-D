import { defineStore } from 'pinia';
const LOCAL_STORAGE_KEY = 'edit-currenct';
const defaultList = [];

const getEditList = () => {
	const list = localStorage.getItem(LOCAL_STORAGE_KEY);

	return list ? JSON.parse(list) : defaultList;
};

export const useEditCurrencyStore = defineStore('edit-currency', {
	state: () => ({ editCurrenctList: getEditList() }),
	getters: {
		getEditList: state => state.editCurrenctList,
	},
	actions: {
		addItem(item) {
			const isContainCurrency = this.editCurrenctList.find(
				e => e.r030 === item.r030 && e.exchangedate === item.exchangedate
			);
			if (isContainCurrency) {
				alert('Ця валюта вже знаходиться в редагованих');
				return;
			}
			console.log(isContainCurrency);
			this.editCurrenctList.push(item);
			localStorage.setItem(
				LOCAL_STORAGE_KEY,
				JSON.stringify(this.editCurrenctList)
			);
		},
		changeItem(itemKey, item) {
			const findedIndex = this.editCurrenctList.findIndex(
				elem => elem.r030 === itemKey
			);
			if (findedIndex !== -1) {
				this.editCurrenctList.splice(findedIndex, 1, item);
			}
		},
	},
});
