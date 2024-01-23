<template>
	<v-table>
		<thead>
			<tr>
				<th>Код цифровий</th>
				<th>Код літерний</th>
				<th>Назва валюти</th>
				<th>Офіційний курс</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in items" :key="item.r030">
				<td>{{ item.r030 }}</td>
				<td>{{ item.cc }}</td>
				<td>{{ item.txt }}</td>
				<td class="text-green font-weight-bold">{{ item.rate }}</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style></style>
