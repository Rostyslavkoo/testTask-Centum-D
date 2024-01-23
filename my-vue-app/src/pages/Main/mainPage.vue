<template>
	<layout-component>
		<main-page-component></main-page-component>
	</layout-component>
</template>

<script>
import LayoutComponent from '../../components/layout/layoutComponent.vue';
import mainPageComponent from '../../components/main/mainPageComponent.vue';

export default {
	components: { mainPageComponent, LayoutComponent },
};
</script>

<style></style>
