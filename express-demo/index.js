const Joi = require('@hapi/joi');
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

    const { error } = validateCourse(req.body); // equivalent to getting result.error

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not exists return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) // 404
        res.status(404).send('Course with given id was not found')

    // Validate the course
    // If invalid, return 404

    // const result = validateCourse(req.body);

    const { error } = validateCourse(req.body); // equivalent to getting result.error

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not exisiting return 404

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) // 404
        res.status(404).send('Course with given id was not found')

    // delete

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);

});

function validateCourse(course){

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

