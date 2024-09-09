import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import CompanyTable from '@/components/CompanyTable.vue';
import EmployeeTable from '@/components/EmployeeTable.vue';

const routes = [
	{
		path: '/',
		redirect: '/login', // Default redirect to login
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: 'companies',
				name: 'CompanyTable',
				component: CompanyTable,
			},
			{
				path: 'employees',
				name: 'EmployeeTable',
				component: EmployeeTable,
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
