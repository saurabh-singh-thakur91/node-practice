const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error(new Error(err)));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('course', courseSchema);

async function getCourses2() {
    const courses = await Course
        .find({
            isPublished: true,
            tags: { $in: ['frontend', 'backend'] }
        })
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 });

    console.log(courses);
}


getCourses2();