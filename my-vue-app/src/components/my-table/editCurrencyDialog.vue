<template>
	<v-dialog v-model="visibility" width="500">
		<v-card>
			<v-card-title>Редагування валюти</v-card-title>
			<v-card-text>
				<div class="d-flex flex-column mb-4">
					<v-card-text>
						<div class="text-center mb-3">
							<h2 class="display-1 font-weight-bold">
								{{ inputCurrency.txt }} {{ inputCurrency.cc }}
							</h2>
							<h3 class="display-1 font-weight-bold">
								{{ inputCurrency.exchangedate }}
							</h3>
						</div>
						<v-text-field
							v-model="inputCurrency.rate"
							label="Офіційний курс"
							outlined
							dense
						></v-text-field>
					</v-card-text>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="error" @click="visibility = false">Закрити</v-btn>
				<v-btn color="primary" @click="onSave">Зберегти</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { computed, ref, toRefs, onMounted } from 'vue';

export default {
	emits: ['close', 'save'],
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
	},
	setup(props, ctx) {
		const { visible, item } = toRefs(props);
		const inputCurrency = ref({
			txt: '',
			exchangedate: '',
			rate: '',
		});
		onMounted(() => {
			inputCurrency.value = { ...item.value };
		});
		const onSave = () => {
			ctx.emit('save', inputCurrency.value);
		};
		const visibility = computed({
			get() {
				return visible.value;
			},
			set() {
				ctx.emit('close');
			},
		});

		return { visibility, inputCurrency, onSave };
	},
};
</script>

<style></style>
