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

async function getCourses3() {
    const courses = await Course.
        find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by*./i }  // . => any character, * 0 or more;
        ]
        )

    console.log(courses);
}

getCourses3();