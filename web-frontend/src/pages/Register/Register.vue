<template>
	<div class="container" style="margin-top: 40px">
		<h1 class="display-3">Register</h1>

		<form>
			<div class="form-group">
				<label>Email address</label>
				<input
					type="text"
					v-model="email"
					class="form-control"
					aria-describedby="emailHelp"
				/>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input v-model="password" type="password" class="form-control" />
			</div>

			<button @click="signUp" class="btn btn-primary">Register</button>
		</form>

		<router-link to="/"> <span>Sign in here</span></router-link>
	</div>
</template>

<script>
import { API_URL } from "../../env.js";

export default {
	name: "register",
	data() {
		return {
			email: "",
			password: "",
		};
	},

	methods: {
		signUp(e) {
			e.preventDefault();
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
			} else {
				alert("Please enter a valid email address");
				return false;
			}
			if (this.password.length < 6) {
				alert("Please Enter valid password");
				return false;
			}
			const user = {
				email: this.email,
				password: this.password,
			};

			const options = {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				},
			};
			fetch(API_URL + "register", options)
				.then((res) => res.json())
				.then((res) => {
					if (!res.isSuccess) {
						alert(res.msg);
					} else {
						alert("Sign up Successfully!");
						this.$router.replace({
							name: "home",
						});
					}
				});
		},
	},
};
</script>
