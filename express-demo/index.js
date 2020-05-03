const express = require('express');
const app = express();

app.use(express.json()); // middleware, use this in request processing pipeline

let courses = [
    {id: 1, name: 'course-1'},
    {id: 2, name: 'course-2'},
    {id: 3, name: 'course-3'}
];

app.get('/', (req, res) => {
    res.send('Hello world, i have nodemon');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) // 404
        res.status(404).send('Course with given id was not found')

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };

    courses.push(course);

    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
