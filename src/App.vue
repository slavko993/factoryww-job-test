<template>
	<transition name="loaded" appear>
		<main class="container">
			<app-account></app-account>
			<app-number-selection></app-number-selection>
			<app-ticket-payment></app-ticket-payment>
			<app-user-tickets></app-user-tickets>
			<app-extracted-numbers></app-extracted-numbers>
		</main>
	</transition>
</template>

<script>
	import Account from './components/Account.vue';
	import NumberSelection from './components/NumberSelection.vue';
	import TicketPayment from './components/TicketPayment.vue';
	import UserTickets from './components/UserTickets.vue';
	import ExtractedNumbers from './components/ExtractedNumbers.vue';

    export default {
        components: {
			'app-account': Account,
			'app-number-selection': NumberSelection,
			'app-ticket-payment': TicketPayment,
			'app-extracted-numbers': ExtractedNumbers,
			'app-user-tickets': UserTickets
		}
    }
</script>

<style>
	* {
		position: relative;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:root {
		font-size: 14px;
		font-family: sans-serif;
	}
	body {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		min-height: 62.1429rem;
	}
	.container {
		display: grid;
		grid-template: repeat(7, 6.25rem) / repeat(12, 1fr);
		grid-gap: 0.625rem;
		width: 100%;
		max-width: 75rem;
	}
	.loaded-enter {
		opacity: 0;
	}
	.loaded-enter-active {
		transition: opacity 0.4s ease-in-out;
	}
</style>