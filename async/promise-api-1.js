const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('async operation 1 . . .');
        resolve(1);
        // reject(new Error('something failed . . .'));
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('async operation 2 . . .');
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.error(err));

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.error(err));
