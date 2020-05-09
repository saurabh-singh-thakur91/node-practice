
const p = Promise.resolve({ id: 1 });

p.then(result => console.log(result));

const pRej = Promise.reject(new Error('reason for rejection'));

pRej.catch(err => console.error(err));