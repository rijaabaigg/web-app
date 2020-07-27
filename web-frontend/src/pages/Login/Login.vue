<template>
	<div class="container" style="margin-top: 40px">
		<h1 class="display-3">Login</h1>

		<form>
			<div class="form-group">
				<label>Email address</label>
				<input
					v-model="email"
					type="text"
					class="form-control"
					aria-describedby="emailHelp"
				/>
				<small id="emailHelp" class="form-text text-muted"
					>We'll never share your email with anyone else.</small
				>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input v-model="password" type="password" class="form-control" />
			</div>

			<button type="submit" @click="signIn" class="btn btn-primary">
				<span style="color: white">Login</span>
			</button>
		</form>

		<router-link to="/register"> <span>Sign Up here</span></router-link>
	</div>
</template>

<script>
import { API_URL } from "../../env.js";
export default {
	name: "login",
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		signIn(e) {
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
			fetch(API_URL + "login", options)
				.then((res) => res.json())
				.then((res) => {
					if (!res.isSuccess) {
						alert(res.msg);
					} else {
						this.$router.replace({
							name: "dashobard",
							params: { user: res.data },
						});
					}
				});
		},
	},
};
</script>
