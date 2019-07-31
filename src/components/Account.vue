<template>
    <section class="account-section">
        <div class="account">
            <span>Raspolozivo stanje: {{ credit }}</span>
            <button class="toggle-dropdown-btn btn" @click="toggleDropdown">Kupovina kredita</button>
            <transition name="fade">
                    <transition-group name="fade" tag="div" class="buy-credit-dropdown" v-if="openDropdown">
                        <div class="credit-amount-wrapper" key="amount">
                            <span>Koliko kredita kupujete: </span>
                            <input class="buy-credit-input"
                                type="text"
                                maxlength="5"
                                v-model.number="wantedCredit"
                                @keydown.enter="buyCredit">
                            <transition name="fade">
                                <div class="error-message" v-if="message">
                                    <p>{{ message }}</p>
                                </div>
                            </transition>
                        </div>
                        <button class="buy-credit-btn btn"
                                @click="buyCredit"
                                key="buy-credit-btn"
                        >Kupite kredit</button>
                    </transition-group>
            </transition>
        </div>
    </section>
</template>

<script>
    import { gameData } from '../main.js';

    export default {
        data() {
            return {
                openDropdown: false,
                wantedCredit: '',
                message: ''
            }
        },
        methods: {
            toggleDropdown() {
                this.openDropdown = !this.openDropdown;
                this.wantedCredit = '';
                this.message = '';
            },
            buyCredit() {
                if (!this.checkInput) return false;

                gameData.user.credit += this.wantedCredit;
                this.openDropdown = false;
                this.wantedCredit = '';
            }
        },
        computed: {
            credit() {
                return gameData.user.credit;
            },
            checkInput() {
                if ((this.wantedCredit == null || this.wantedCredit == '') || (typeof this.wantedCredit !== 'number') || (this.wantedCredit <= 0)) {
                    this.message = 'Neispravan unos';
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
    .account-section {
        position: fixed;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0 0.9375rem;
        padding-top: 1.4286rem;
        background-position: top left;
        background-size: 30% 0.1429rem;
        background-repeat: repeat-x;
        background-image: linear-gradient(to right,
                                          red,
                                          red 10%,
                                          blue 10%,
                                          blue 25%,
                                          purple 25%,
                                          purple 35%,
                                          green 35%,
                                          green 55%,
                                          royalblue 55%,
                                          royalblue 70%,
                                          goldenrod 70%,
                                          goldenrod 85%,
                                          #bada55 85%,
                                          #bada55 100%);
        z-index: 500;
        pointer-events: none;
    }
    .account {
        position: relative;
        padding: 1.0714rem;
        background-color: white;
        border: 0.0714rem solid #dedede;
        box-shadow: 0.1429rem 0.1429rem 0.1429rem #d1cfcf;
        pointer-events: all;
    }
    .account span {
        padding: 0.3571rem 0.5rem;
    }
    .btn {
        padding: 0.3571rem 0.7143rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.4s ease-in-out,
                    color 0.4s ease-in-out;
    }
    .toggle-dropdown-btn {
        color: black;
        background-color: rgb(156, 214, 255);
        border-radius: 0.2857rem;
        border: 0.1429rem solid royalblue;
    }
    .toggle-dropdown-btn:hover {
        color: white;
        background-color: royalblue;
    }
    .buy-credit-dropdown {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        top: 0;
        left: 0;
        padding: 0.9375rem;
        width: 100%;
        background-color: white;
        border: 0.1429rem solid rgb(207, 207, 207);
        box-shadow: 0.2857rem 0.2857rem 0.6429rem 0 #d0d0d0;
        transform: translateY(6.0714rem);
    }
    .buy-credit-dropdown::before, .buy-credit-dropdown::after {
        content: "";
        position: absolute;
        top: 0;
        right: 50%;
        width: 0;
        height: 0;
        border: 0.8571rem solid transparent;
        border-bottom-color: rgb(207, 207, 207);
        transform: translate(50%, -100%);
    }
    .buy-credit-dropdown::after {
        border: 10.0002px solid transparent;
        border-bottom-color: white;
    }
    .credit-amount-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.9375rem;
    }
    .buy-credit-input {
        padding: 0.3571rem;
        width: 17%;
        text-align: center;
        font-size: inherit;
        border-radius: 0.3571rem;
        border: 0.0714rem solid grey;
    }
    .buy-credit-input:hover {
        border: 0.0714rem solid #0a71f3;
    }
    .buy-credit-input:focus {
        border: 0.0714rem solid #0a71f3;
        box-shadow: 0 0 0.1429rem #0a71f3;
    }
    .error-message {
        margin-top: 0.625rem;
        padding: 0.3571rem 0.7143rem;
        width: 100%;
        font-weight: bold;
        color: #a50000;
        border: 0.0714rem solid #a50000;
    }
    .buy-credit-btn {
        color: black;
        background-color: rgb(74, 228, 212);
        border-radius: 0.2857rem;
        border: 0.1429rem solid rgb(19, 137, 125);
    }
    .buy-credit-btn:hover {
        color: white;
        background-color: rgb(19, 137, 125);
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
