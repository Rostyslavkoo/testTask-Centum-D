<template>
	<v-layout class="rounded rounded-md">
		<v-app-bar title="Відображення курсу валют НБУ">
			<template v-slot:prepend>
				<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			</template>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer">
			<v-list color="green ">
				<v-list-item
					prepend-icon="mdi-file-outline"
					value="main"
					title="Головна"
					:to="{ name: 'main' }"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-note-edit-outline"
					value="edit"
					title="Змінені курси"
					:to="{ name: 'edit' }"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-magnify"
					value="search"
					title="Пошук курсу"
					:to="{ name: 'search' }"
				></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main class="d-flex align-center">
			<slot></slot>
		</v-main>
	</v-layout>
</template>
<script>
import { ref } from 'vue';

export default {
	setup() {
		const drawer = ref(true);
		return { drawer };
	},
};
</script>
