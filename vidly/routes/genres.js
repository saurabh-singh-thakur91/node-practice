const express = require('express');

const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Thriller' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Romance' },
    { id: 5, name: 'Comedy' }
];

// CRUD APIs
router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with the given ID: ${req.params.id} was not found`);

    return genre;
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body); // equivalent to getting result.error
    if (error) return res.status(400).send(error[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);

    res.send(genre);
});

router.put('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with the given ID: ${req.params.id} was not found`);

    const { error } = validateGenre(req.body); // equivalent to getting result.error
    if (error) return res.status(400).send(error[0].message);

    genre.name = req.body.name;

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with the given ID: ${req.params.id} was not found`);

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.send(genre);
});

// Validate schema function
function validateGenre(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

module.exports = router;