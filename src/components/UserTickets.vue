<template>
    <section class="user-tickets-section">
        <div class="ticket"
             :class="classObject(tickets[i - 1])"
             v-for="i in 5"
             :key="`number-${ i - 1 }`">
             <transition name="fade">
                <div class="numbers" v-if="tickets[i - 1]">
                    <app-number
                        v-for="number in tickets[i - 1]['numbers']"
                        :key="`number-${number}`"
                    >{{ number }}</app-number>
                </div>
             </transition>
             <div class="status">
                <p>
                    {{ tickets[i - 1] ? tickets[i - 1]['status'] : '' }}
                </p>
             </div>
        </div>
    </section>
</template>

<script>
    import SingleNumber from './shared/Number.vue'
    import { gameData } from '../main.js';

    export default {
        components: {
            'app-number': SingleNumber
        },
        data() {
            return {
                tickets: gameData.user.tickets
            }
        },
        methods: {
            // u zavisnosti od statusa tiketa, vracamo odgovarajucu klasu
            classObject(ticket) {
                if (!ticket) return;

                switch (ticket['status']) {
                    case 'dobitan':
                        return { win: true };
                    case 'gubitan':
                        return { lost: true }
                    default:
                        return;
                }
            }
        }
    }
</script>

<style scoped>
    .user-tickets-section {
        /* - From parent - */
        align-content: center;
        grid-column: 1 / 8;
        grid-row: 3 / -1;
        /* --- */
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        background-color: white;
        border: 0.1429rem solid black;
    }
    .ticket {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.625rem 1.25rem;
        border-bottom: 0.1429rem solid black;
    }
    .ticket:last-of-type {
        border-bottom: 0;
    }
    .ticket.win {
        background-color: rgb(154, 255, 192);
    }
    .ticket.win .number-wrapper {
        color: green;
        background-color: white;
        border-color: green;
    }
    .ticket.lost {
        background-color: #ffc2c2;
    }
    .ticket.lost .number-wrapper {
        color: red;
        background-color: white;
        border-color: red;
    }
    .status {
        margin-left: 1.25rem;
        text-transform: uppercase;
        font-size: 2.5rem;
    }
    .numbers {
        /* - From parent - */
        flex: 1;
        /* --- */
        display: flex;
    }
    .number-wrapper {
        margin-left: 2.5rem;
        width: 3.375rem;
        height: 3.375rem;
        color: black;
        background-color: #f3f3f3;
    }
    .number-wrapper:first-of-type {
        margin-left: 0;
    }
    /* --- */
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity 0.2s ease-in-out;
    }
    .fade-leave-active {
        position: absolute;
        transition: opacity 0.2s ease-in-out;
        opacity: 0;
    }
    /* --- */
</style>
