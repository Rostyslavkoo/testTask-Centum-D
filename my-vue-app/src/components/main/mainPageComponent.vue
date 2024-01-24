<template>
	<div>
		<v-row justify="space-between" align="center" class="mr-1">
			<v-col cols="auto">
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
				></v-autocomplete>
			</v-col>
		</v-row>
		<v-card-subtitle>
			на дату {{ moment().format('DD.MM.Y') }}
		</v-card-subtitle>
		<v-card-text>
			<my-table :items="getPaginationExchangeList" />
		</v-card-text>
		<v-card-actions v-if="!searchQuery">
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
import { onMounted } from 'vue';
import exchangeService from '../../service/exchange/exchangeService';
import { ref, computed } from 'vue';
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
		const searchQuery = ref();

		const getExchangeList = async () => {
			try {
				isLoading.value = true;
				const result = await exchangeService.getExchange({ date: moment().format('YMMDD', { trim: false }) });

				exchangeList.value = result;
				totalPage.value = Math.ceil(exchangeList.value.length / limit);
			} catch (e) {
				console.log(e);
			} finally {
				isLoading.value = false;
			}
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
		onMounted(() => {
			getExchangeList();
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
			getSearchedExchangeList,
		};
	},
};
</script>

<style></style>
