<script>
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

export default {
	data() {
	return {
		isAuthenticated: false,
	};},
	components: {
		Home,
		Login,

	}
}
</script>

<template>
		<router-view />
</template>

<style scoped>
/* Your styles here */
</style>
