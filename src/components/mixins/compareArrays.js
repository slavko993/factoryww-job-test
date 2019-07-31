export const compareArrays = {
    methods: {
        compareArrays(a, b) {
			return a.every(number => b.includes(number));
		}
    }
}