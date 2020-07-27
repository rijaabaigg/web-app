<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import LoginPage from "./pages/Login/Login.vue";
export default {
	components: {
		login: LoginPage,
	},
	name: "app",
	data() {
		return {
			msg: "Welcome to Your Vue.js App",
		};
	},
};
</script>
