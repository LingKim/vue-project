const Home = () => import(/*webpackChunkName: "home"*/'@pages/Home');
const Login = () => import(/*webpackChunkName: "login"*/'@pages/Login');

export default [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	}
]
