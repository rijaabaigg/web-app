<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">Welcome to Dashboard</a>
			<ul class="navbar-nav">
				<li class="nav-item-right">
					<a class="nav-link text-right" href="#">{{ userEmail }}</a>
				</li>
			</ul>
		</nav>
		<div style="margin-top: 50px" class="container">
			<div class="row">
				<div class="col-sm">
					<label for="exampleInputEmail1">Search By Topic</label>
					<input
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Search By Topic"
						v-model="search"
					/>
				</div>
				<div class="col-sm">
					<div class="form-group container">
						<label for="exampleFormControlSelect1">Sortings</label>
						<select class="form-control" v-model="courseFilter">
							<option disabled value="">Please select one</option>

							<option>By Price</option>
							<option>By Topic</option>
							<option>Reset</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm">
					<button type="button" @click="asceOrder" class="btn btn-warning">
						Ascending order
					</button>
					<button type="button" @click="descenOrder" class="btn btn-info">
						Descending order
					</button>
				</div>
			</div>

			<div style="margin-top: 40px">
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Topic</th>
							<th scope="col">Price</th>
							<th scope="col">Location</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(course, index) in courses" :key="course._id">
							<th scope="row">{{ index + 1 }}</th>
							<td>{{ course.topic }}</td>
							<td>{{ course.price }}</td>
							<td>{{ course.location }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { API_URL } from "../../env.js";
import * as _ from "lodash";
export default {
	name: "register",
	props: {
		user: {},
	},
	data() {
		return {
			msg: "Welcome to Your Vue.js App",
			userEmail: "---",
			courses: [],
			courseFilter: "",
			coursesCopy: [],
			search: "",
		};
	},

	mounted() {
		console.log(this.user);
		this.userEmail = this.user.email;
	},

	watch: {
		courseFilter: function() {
			if (this.courseFilter == "Reset") {
				console.log("reset");
				this.courses = this.coursesCopy;
			}
		},

		search: function() {
			if (this.courseFilter.length < 1) {
				var courses = [];

				this.courses.forEach((course) => {
					if (course.topic.toLowerCase().indexOf(this.search) > -1) {
						courses.push(course);
					}

					this.courses = courses;
				});
			}

			if (this.courseFilter == "By Topic") {
				var courses = [];

				this.courses.forEach((course) => {
					if (course.topic.toLowerCase().indexOf(this.search) > -1) {
						courses.push(course);
					}

					this.courses = courses;
				});

				if (this.search.length < 1) {
					this.courses = this.coursesCopy;
				}
			}

			if (this.courseFilter == "By Price") {
				console.log("its price");
				var courses = [];

				if (this.search.length < 1) {
					this.search = 0;
				}
				var courses = [];

				this.coursesCopy.forEach((course) => {
					if (course.price > parseInt(this.search)) {
						courses.push(course);
					}
					this.courses = courses;
				});
			}
		},
	},

	created() {
		fetch(API_URL + "get-courses")
			.then((res) => res.json())
			.then((res) => {
				console.warn(res);
				this.courses = res;
				this.coursesCopy = res;
			});
	},

	methods: {
		asceOrder() {
			let courses = _.orderBy(this.courses, ["price"], ["asc"]);
			this.courses = courses;
		},
		descenOrder() {
			let courses = _.orderBy(this.courses, ["price"], ["desc"]);
			this.courses = courses;
		},
	},
};
</script>
