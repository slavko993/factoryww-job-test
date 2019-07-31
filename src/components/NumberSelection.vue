<template>
    <section class="select-numbers-section">
        <div class="numbers-wrapper" @click="selectNumber">
            <app-number 
                v-for="number in 30"
                :key="`number-${ number }`"
                ref="number-wrapper"
            >{{ number }}</app-number>
        </div>
        <transition name="fade">
            <div class="extracted-number-wrapper" v-if="extractedNumbers.length">
                <p class="extracted-number">
                    {{ extractedNumbers[extractedNumbers.length - 1] }}
                </p>
            </div>
        </transition>
    </section>
</template>

<script>
    import SingleNumber from './shared/Number.vue';
    import { removeItem } from './mixins/removeItem.js';
    import { gameData } from '../main.js';

    export default {
        mixins: [removeItem],
        components: {
            'app-number': SingleNumber
        },
         data() {
            return {
                extractedNumbers: gameData.extractedNumbers
            }
        },
        methods: {
            selectNumber(event) {
                // proveravamo da li smo kliknuli na pravi element (broj)
                if (!event.target.classList.contains('number-wrapper')) return;

                const target = event.target;
                // za ovo sam mogao da koristim i data atribut koji bih predhodno generisao, ali mi se ovo resenje...
                // ucinilo prakticnije. Negde sam procitao da "data" atributi nisu bas najbolji kada su u pitanju performanse
                const number = parseInt(target.textContent, 10);
                
                // proveravamo da li je element vec izabran, broj izabranih brojeva i ukupan broj tiketa
                if (!target.classList.contains('selected') && gameData.selectedNumbers.length < 5 && gameData.user.tickets.length < 5) {
                    target.classList.add('selected');
                    // dodajemo broj u niz izabranih brojeva
                    gameData.selectedNumbers.push(number);
                } else {
                    target.classList.remove('selected');
                    // remove item je funkcija koja uklanja broj iz niza (u ovom slucaju niza izabranih brojeva)
                    this.removeItem(gameData.selectedNumbers, number);
                }
            },
            deselectNumbers() {
                // uklanjamo klasu "selected" sa svih elementa
                // metoda za uklanjanje klase ne vraca gresku cak i ako element nema klasu koju zelimo ukloniti
                this.$refs['number-wrapper'].forEach(obj => {
                    obj.$el.classList.remove('selected');
                });

                // uklanjamo sve elemente iz niza izabranih brojeva
                // to radimo na ovaj nacin kako bi zadrzali reaktvnost
                gameData.selectedNumbers.splice(0, gameData.selectedNumbers.length);
            }
        },
        created() {
            gameData.$on('deselectNumbers', () => {
                this.deselectNumbers();
            });
        }
    }
</script>

<style scoped>
    .select-numbers-section {
        /* - From parent - */
        grid-column: 8 / -1;
        grid-row: 1 / span 4;
        /* --- */
        border: 0.1429rem solid black;
    }
    .numbers-wrapper {
        display: grid;
        grid-template: repeat(5, 1fr) / repeat(6, 1fr);
        height: 100%;
        background-color: white;
    }
    .number-wrapper {
        cursor: pointer;
    }
    .selected {
        color: black;
        background: rgb(255, 251, 29);
    }
    .number-wrapper.selected:hover {
        background-color: rgb(255, 254, 172);
    }
    .number-wrapper:not(.selected):hover {
        background-color: rgb(92, 174, 241);
    }
    .extracted-number-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(1, 26, 46);
        z-index: 15;
    }
    .extracted-number {
        font-size: 10rem;
        font-weight: bold;
        color: white;
        user-select: none;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity 0.4s ease-in-out;
    }
    .fade-leave-active {
        transition: opacity 0.4s ease-in-out;
        opacity: 0;
    }
</style>
