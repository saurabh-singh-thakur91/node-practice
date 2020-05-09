const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect to mongodb', new Error(err)));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        author: 'Saurabh',
        tags: ['angular', 'JS', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result)
}

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function getCourses2() {
    const courses = await Course
    .find({ author: 'Saurabh', isPublished: true})
    .limit(10)
    .sort( { name: 1 } )
    .select( { name: 1, tags: 1 } );

    console.log(courses);
}

async function getCourses3(){
    const courses = await Course
    // use ^ for starts with sau, query is case sensitive by default add i to make it case insensitive /^sau/i
    //.find({ author: /^sau/ }) 

    // use $ for ends with abh
    .find( { author: /abh$/i } ) 

    // contains a pattern
    .find( { author: /.*rab.*/i } )
    .limit(10)
    .sort( { name: 1 } )
    .select( { name: 1, tags: 1 } );

    console.log(courses);
}

getCourses3();
