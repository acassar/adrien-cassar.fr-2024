import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: "/pong",
			name: "pong",
			component: () => import("../components/pong/GameComponent.vue")
		},
		{
			path: "/tetris",
			name: "tetris",
			component: () => import("../components/Tetris/TetrisGameComponent.vue")
		}
	]
});

export default router;
