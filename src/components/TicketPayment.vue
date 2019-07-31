<template>
    <section class="ticket-section">
        <transition-group name="fade" tag="div">
            <div class="ticket" v-if="numbers.length" key="ticket-info">
                <transition-group name="fade" tag="div" class="numbers-wrapper">
                    <app-number
                        v-for="num in numbers"
                        :key="`number-${num}`"
                    >{{ num }}</app-number>
                </transition-group>
                <p class="odds">Kvota: {{ odds }}</p>
                <div class="payment-wrapper">
                    <div class="payment">
                        <span>Uplata:</span>
                        <input type="text"
                            class="payment-input"
                            maxlength="5"
                            v-model.number="payment"
                            @keydown.enter="payTicket">
                    </div>
                    <div class="win">
                        <span>Dobitak: {{ win }}</span>
                    </div>
                    <transition name="fade">
                        <div class="error-message" v-if="message">
                            <p>{{ message }}</p>
                        </div>
                    </transition>
                </div>
            </div>
            <div key="btn-group">
                <transition name="fade">
                    <button class="pay-ticket-btn"
                            :disabled="!numbers.length"
                            v-if="numberOfTickets"
                            @click="payTicket"
                            ref="pay-btn"
                            key="pay"
                    >Dodaj Tiket</button>
                    <button class="play-btn"
                            v-else
                            @click.once="play"
                            ref="play-btn"
                            key="play"
                    >ODIGRAJ</button>
                </transition>
            </div>
        </transition-group>
    </section>
</template>

<script>
    import SingleNumber from './shared/Number.vue';
    import { compareArrays } from './mixins/compareArrays.js'
    import { gameData } from '../main.js';
    
    export default {
        mixins: [compareArrays],
        components: {
            'app-number': SingleNumber
        },
        data() {
            return {
                numbers: gameData.selectedNumbers,
                payment: '',
                message: ''
            }
        },
        methods: {
            payTicket() {
                // proveravamo da li je tiket ispravan pre nego sto ga proknjizimo
                if (!this.checkTicket) return false;

                // dodajemo tiket (izabrane brojeve (kopiju niza), dobitak i placeholder za status) u glavni objekat za igru
                gameData.user.tickets.push({
                    numbers: this.numbers.slice(),
                    win: this.win,
                    status: ''
                });

                // oduzimamo credit sa korisnickog naloga
                gameData.user.credit = gameData.user.credit - this.payment;
                // resetujemo uplatu za predhodni tiket
                this.payment = '';
                // na glavni objekat za igru emitujemo event koji ce NumberSelection komponenta iskoristiti da resetuje izabrane brojeve
                gameData.$emit('deselectNumbers');
            },
            play() {
                // funkcija na glavni objekat emituje event koji ce pokrenuti izvlacenje brojeva
                gameData.$emit('startGame');
                // iskljucujemo dugme play
                this.$refs['play-btn'].disabled = "true";
            },
            // ova funkcija proverava da li je tiket sa istim brojevima vec dodat
            checkForDuplicatedTickets() {
                for (const ticket of gameData.user.tickets) {
                    if (this.numbers.length === ticket.numbers.length) {
                        if (this.compareArrays(ticket.numbers, this.numbers)) return true;
                    }
                }
            }
        },
        computed: {
            // proveravamo broj tiketa kako bi odredili koje dugme treba biti prikazano
            numberOfTickets() {
                return gameData.user.tickets.length  < 5;
            },
            // odredjujemo kvotu na osnovu izabranih brojeva
            odds() {
                switch(this.numbers.length) {
                    case 1:
                        return 1.85
                    case 2:
                        return 2.5
                    case 3:
                        return 4.85
                    case 4:
                        return 7.25
                    case 5:
                        return 12.5
                    default:
                        return 1
                }
            },
            // racunamo potencijali dobitak
            win() {
                if(typeof this.payment !== 'number') return '/';
                return Math.round(this.payment * this.odds);
            },
            // proveravamo ispravnost tiketa
            checkTicket() {
                if ((gameData.user.credit - this.payment) < 0) {
                    this.message = 'Nemate dovoljno kredita';
                    return false;
                } else if (this.checkForDuplicatedTickets()) {
                    this.message = 'Ne mozete odigrati vise istih tiketa';
                    return false;
                } else if ((this.payment == null || this.payment == '') || (typeof this.payment !== 'number') || (this.payment <= 0)) {
                    this.message = 'Neispravana uplata';
                    return false;
                } else {
                    this.message = '';
                    return true;
                }
            }
        }
    }
</script>

<style scoped>
    .ticket-section {
        /* - From parent - */
        grid-column: 8 / -1;
        grid-row: 5 / -1;
        /* --- */
        background-color: white;
    }
    .ticket {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 0.625rem;
        padding: 0.625rem 1.25rem;
        border: 0.1429rem solid black;
    }
    .payment {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .payment span {
        margin-right: 0.5rem;
    }
    .payment-input {
        padding: 0.3571rem;
        width: 21%;
        text-align: center;
        font-size: inherit;
        border: 0.0714rem solid grey;
    }
    .payment-input:hover {
        border: 0.0714rem solid #0a71f3;
    }
    .payment-input:focus {
        border: 0.0714rem solid #0a71f3;
        box-shadow: 0 0 0.1429rem #0a71f3;
    }
    .numbers-wrapper {
        /* - From parent - */
        flex: 1;
        /* --- */
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0.625rem;
    }
    .number-wrapper {
        margin-right: 0.9375rem;
        width: 2.1875rem;
        height: 2.1875rem;
        text-align: center;
        font-weight: bold;
        color: white;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border-color: rgb(20, 20, 20);
    }
    .number-wrapper:last-of-type {
        margin-right: 0;
    }
    .odds {
        margin-left: auto;
        font-weight: bold;
    }
    .payment-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.625rem;
        width: 100%;
        border-top: 0.0625rem dashed black;
    }
    .error-message {
        margin-top: 0.625rem;
        padding: 0.3571rem 0.7143rem;
        width: 100%;
        font-weight: bold;
        color: #a50000;
        border: 0.0714rem solid #a50000;
    }
    .pay-ticket-btn, .play-btn {
        padding: 0.7143rem 0;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        font-size: 3.125rem;
        letter-spacing: 0.0938rem;
        color: white;
        background-color: #f0533a;
        border: 0.1429rem solid black;
        transition: background-color 0.2s ease-in-out;
        overflow: hidden;
        cursor: pointer;
    }
    .pay-ticket-btn:hover {
        background-color: #a01b06;
    }
    .play-btn:hover {
        background-color: #07418d;
    }
    .pay-ticket-btn:disabled, .play-btn:disabled {
        color: grey;
        background-color: ghostwhite;
        border-color: grey;
        cursor: auto;
    }
    .pay-ticket-btn:disabled::before, .play-btn:disabled::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 0.1429rem;
        background-color: grey;
        transform: translate(-50%, -50%) rotate(7deg);
    }
    .pay-ticket-btn:disabled::after, .play-btn:disabled::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 0.1429rem;
        background-color: grey;
        transform: translate(-50%, -50%) rotate(-7deg);
    }
    .play-btn {
        background-color: #6daef8;
        border-color: #1373ce;
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
    .fade-move {
        transition: transform 0.2s ease-in-out;
    }
    /* --- */
</style>
