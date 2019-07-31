import Vue from 'vue';
import BabelPolyfill from 'babel-polyfill';
import App from './App.vue';

export const gameData = new Vue({
	data: {
		user: {
			credit: 5000,
			tickets: []
		},
		selectedNumbers: [],
		extractedNumbers: []
	}
});

new Vue({
	el: '#app',
	render: h => h(App)
})
