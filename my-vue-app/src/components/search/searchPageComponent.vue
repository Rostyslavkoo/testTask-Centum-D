<template>
	<div>
		<v-row justify="space-between" align="center" class="mr-1">
			<v-col cols="7">
				<v-card-title>
					Офіційний курс гривні щодо іноземних валют
				</v-card-title>
			</v-col>
			<v-col cols="3">
				<v-autocomplete
					v-model="searchQuery"
					:items="exchangeList"
					item-title="txt"
					item-value="r030"
					density="compact"
					label="Пошук"
					prepend-inner-icon="mdi-magnify"
					variant="solo"
					hide-details="auto"
					clearable
                    :disabled="!searchQuery && !getSearchedExchangeList.length"
				></v-autocomplete>
			</v-col>
			<v-col cols="2">
				<v-text-field
					type="date"
					v-model="searchDate"
					density="compact"
					label="Дата"
					variant="solo"
					hide-details="auto"
					clearable
				>
				</v-text-field>
			</v-col>
		</v-row>
		<v-card-text>
			<div class="w-100 text-center font-weight-bold" v-if="!searchDate && !isLoading">
				Оберіть дату
			</div>
			<div class="w-100 text-center font-weight-bold" v-else-if="!getPaginationExchangeList.length && !isLoading">
				Немає даних
			</div>
			<my-table v-else :items="getPaginationExchangeList" />
		</v-card-text>
		<v-card-actions v-if="!searchQuery && getPaginationExchangeList.length">
			<v-pagination
				density="comfortable"
				v-model="page"
				:length="totalPage"
				:total-visible="5"
				class="mx-auto"
			></v-pagination>
		</v-card-actions>
	</div>
</template>

<script>
import exchangeService from '../../service/exchange/exchangeService';
import { ref, computed, watch, onMounted } from 'vue';
import moment from 'moment';
import myTable from '../my-table/myTable.vue';

export default {
	components: { myTable },
	setup() {
		const isLoading = ref(false);
		const exchangeList = ref([]);
		const totalPage = ref(0);
		const page = ref(1);
		const limit = 10;
		const searchDate = ref();
		const searchQuery = ref();
		const getExchangeList = async searchDate => {
			try {
				isLoading.value = true;
				const result = await exchangeService.getExchange({ date: searchDate });
                exchangeList.value = result;
				totalPage.value = Math.ceil(exchangeList.value.length / limit);
			} catch (e) {
				console.log(e);
			} finally {
				isLoading.value = false;
			}
		};
		watch(searchDate, elem => {
            if(!elem){
                searchQuery.value = ''
                exchangeList.value  = []
            }
			getExchangeList(getPropertyformat(elem));
		});
		const getPropertyformat = date => {
			return moment(date).format('YMMDD', { trim: false });
		};
		const getPaginationExchangeList = computed(() => {
			return [
				...getSearchedExchangeList.value.slice(
					(page.value - 1) * limit,
					page.value * limit
				),
			];
		});
		const getSearchedExchangeList = computed(() => {
			if (searchQuery.value) {
				return [
					...exchangeList.value.filter(e => e.r030 === searchQuery.value),
				];
			} else {
				return exchangeList.value;
			}
		});
		return {
			exchangeList,
			isLoading,
			page,
			getPaginationExchangeList,
			limit,
			totalPage,
			moment,
			searchQuery,
			searchDate,
			getSearchedExchangeList,
		};
	},
};
</script>

<style></style>
