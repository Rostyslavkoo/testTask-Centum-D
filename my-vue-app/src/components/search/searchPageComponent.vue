<template>
	<div>
		<v-row justify="space-between" align="center" class="mr-1">
			<v-col cols="6">
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
			<v-col cols="3">
				<v-menu v-model="dateMenu">
					<template v-slot:activator="{ props }">
						<v-text-field
							readonly
							v-bind="props"
							v-model="formattedDate"
							density="compact"
							label="Дата"
							variant="solo"
							hide-details="auto"
							clearable
							:loading="isLoading"
							:disabled="isLoading"
                            @click:clear="searchDate = null"
						/>
					</template>
					<v-date-picker
						hide-header
						locale="UK"
						v-model="searchDate"
						@input="dateMenu = false"
					></v-date-picker>
				</v-menu>
			</v-col>
		</v-row>
		<v-card-text>
			<div
				class="w-100 text-center font-weight-bold"
				v-if="!searchDate && !isLoading"
			>
				Оберіть дату
			</div>
			<div
				class="w-100 text-center font-weight-bold"
				v-else-if="!getPaginationExchangeList.length && !isLoading"
			>
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
		const dateMenu = ref(false);
		const formattedDate = ref('');

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
			if (!elem) {
				searchQuery.value = '';
				exchangeList.value = [];
                return
			}

			formattedDate.value = moment(elem).format('DD.MM.Y');
			getExchangeList(getPropertyformatToSend(elem));
		});
		const getPropertyformatToSend = date => {
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
			dateMenu,
			formattedDate,
		};
	},
};
</script>

<style></style>
