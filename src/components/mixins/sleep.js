export const sleep = {
    methods: {
        sleep(ms) {
			return new Promise(function(resolve, reject) {
				setTimeout(() => {
					resolve()
				}, ms);
			});
		}
    }
}