const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello world');
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify(['NodeJS', 'Angular', 'MongoDB']));
        res.end();
    }
}); // has all the properties of an event emitter

/* server.on('connection', (socket) => {
    console.log('New connection', socket);
});*/

server.listen(3000);

console.log('Listening on port 3000 . . .');