// pending -> fulfilled | rejected

const p = new Promise((resolve, reject) => {
    // Kick off some async work

    setTimeout(() => {
        // resolve(1); // state goes from pending to resolved or fulfilled
        reject(new Error('error message')); // state goes from pending to rejected
    }, 2000);
});

p
    .then(result => console.log('Result: ', result))
    .catch(error => console.log('Error: ', error.message));