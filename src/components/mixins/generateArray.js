export const generateArray = {
    methods: {
        generateArray(start, end) {
            const arr = [];

            for(let i = start; i <= end; i++) {
                arr.push(i);
            }

            return arr;
        }
    }
}