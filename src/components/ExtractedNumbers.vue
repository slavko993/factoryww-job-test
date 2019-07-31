<template>
    <section class="extracted-numbers-section">
        <div class="numbers-wrapper">
            <app-number
                :class="{ empty: !extractedNumbers[i - 1] }"
                v-for="i in 12"
                :key="`number-${i - 1}`"
            >{{ extractedNumbers[i - 1] }}</app-number>
        </div>
    </section>
</template>

<script>
    import SingleNumber from './shared/Number.vue';
    import { generateArray } from './mixins/generateArray.js';
    import { compareArrays } from './mixins/compareArrays.js';
    import { removeItem } from './mixins/removeItem.js';
    import { sleep } from './mixins/sleep.js'
    import { gameData } from '../main.js';

    export default {
        mixins: [generateArray, compareArrays, removeItem, sleep],
        components: {
            'app-number': SingleNumber
        },
        data() {
            return {
                numbers: this.generateArray(1, 30),
                extractedNumbers: gameData.extractedNumbers
            }
        },
        methods: {
            async startGame() {
                // s obzirom da se izvlaci 12 brojeva, kroz for petlju prolazimo 12 puta
                for(let i = 0; i < 12; i++) {
                    // iz niza izvlacimo jedan broj
                    this.extractNumber(this.numbers);
                    // cekamo 2 sekunde pre vracanja na pocetak for petlje kako bi izvukli naredni broj
                    await this.sleep(2000);
                }
                // proveravamo dobitne tikete
                this.checkWinningTickets();
                // cekamo pet sekundi pre nego sto se igra vrati na pocetak
                await this.sleep(5000);

                this.resetGame();
            },
            checkWinningTickets() {
                // forEach petljom prolazimo kroz tikete korisnika
                gameData.user.tickets.forEach(ticket => {
                    // sada za svaki tiket vrsimo proveru da li se svi njegovi brojevi nalaze u izvucenim brojevima
                    // ako je to tacno, menjamo status tiketa u dobitan i dobitak dodajemo na korisnicki nalog
                    if (this.compareArrays(ticket.numbers, gameData.extractedNumbers)) {
                        ticket.status = 'dobitan';
                        gameData.user.credit += ticket.win;
                    } else {
                        ticket.status = 'gubitan';
                    }
                });
            },
            extractNumber(arr) {
                // biramo jedan broj iz niza
                const number = arr[Math.floor(Math.random() * arr.length)];

                // dodajemo izvuceni broj u niz za izvucene brojeve
                // zatim taj broj uklanjamo iz niza iz kojeg smo ga izvukli kako nebi bio ponovo izvucen
                this.extractedNumbers.push(number);
                this.removeItem(arr, number);
            },
            // vracamo igru na pocetak tako sto resetujemo odredjene propertije
            resetGame() {
                gameData.user.tickets.splice(0, gameData.user.tickets.length);
                gameData.selectedNumbers.splice(0, gameData.selectedNumbers.length);
                gameData.extractedNumbers.splice(0, gameData.extractedNumbers.length);
                this.numbers = this.generateArray(1, 30);
            }
        },
        created() {
            // cekamo znak (event) za pocetak igre
            gameData.$on('startGame', () => {
                this.startGame();
            });
        }
    }
</script>

<style scoped>
    .extracted-numbers-section {
        grid-column: 1 / 8;
        grid-row: 1 / span 2;
        padding: 1.5625rem;
        background-color: white;
        border: 0.1429rem solid black;
    }
    .numbers-wrapper {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 1fr 1fr;
        width: 100%;
        height: 100%;
    }
    .number-wrapper {
        width: 4.125rem;
        height: 4.125rem;
    }
</style>
