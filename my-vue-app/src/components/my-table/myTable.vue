<template>
	<v-table>
		<thead>
			<tr>
				<th>
					<v-btn density="comfortable" icon readonly variant="text">
						<v-icon density="compact">mdi-cogs</v-icon>
					</v-btn>
				</th>
				<th>Код цифровий</th>
				<th>Код літерний</th>
				<th>Назва валюти</th>
				<th>Офіційний курс</th>
				<th v-if="type === 'edit'">Дата</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in items" :key="item.r030">
				<td>
					<v-btn
						density="comfortable"
						icon
						color="info"
						@click="onChooseCurrency(item)"
					>
						<v-icon density="compact">mdi-pencil</v-icon>
					</v-btn>
				</td>
				<td>{{ item.r030 }}</td>
				<td>{{ item.cc }}</td>
				<td>{{ item.txt }}</td>
				<td class="text-green font-weight-bold">{{ item.rate }}</td>
				<td v-if="type === 'edit'">{{ item.exchangedate }}</td>
			</tr>
		</tbody>
		<edit-currency-dialog
			v-if="visibleEditdialog"
			:visible="visibleEditdialog"
			:item="chosenItem"
			@close="visibleEditdialog = false"
			@save="onSave"
		/>
	</v-table>
</template>

<script>
import { ref, toRefs } from 'vue';
import editCurrencyDialog from './editCurrencyDialog.vue';
import { useEditCurrencyStore } from './../../stores/editedCurrency';

export default {
	components: { editCurrencyDialog },
	setup(props) {
		const chosenItem = ref({});
		const visibleEditdialog = ref(false);
		const editCurrencyStore = useEditCurrencyStore();
		const { type } = toRefs(props);

		const onSave = item => {
			if (type.value === 'edit') {
				editCurrencyStore.changeItem(item.r030, item);
			} else {
				editCurrencyStore.addItem(item);
			}
			chosenItem.value = {};
			visibleEditdialog.value = false;
			console.log('save');
		};

		const onChooseCurrency = item => {
			chosenItem.value = item;
			visibleEditdialog.value = true;
		};
		return { visibleEditdialog, chosenItem, onChooseCurrency, onSave };
	},
	props: {
		type: {
			type: String,
			required: false,
			default: '',
		},
		items: {
			type: Array,
			required: true,
		},
	},
};
</script>
