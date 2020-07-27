import LoginPage from "./pages/Login/Login.vue";
import DashboardPage from "./pages/Dashboard/Dashobard.vue";
import SignUpPage from "./pages/Register/Register.vue";

const routes = [
	{ path: "/", name: "home", component: LoginPage },
	{ path: "/register", component: SignUpPage },
	{
		path: "/dashboard",
		name: "dashobard",
		component: DashboardPage,
		props: true,
	},
];

export default routes;
