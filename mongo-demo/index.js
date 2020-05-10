const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect to mongodb', new Error(err)));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    }, // Validations are only meaningful in mongoose not in mongoDB
    author: String,
    // tags: [String],
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course shoudl have atleast 1 tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished }
    }
});

const Course = mongoose.model('course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        author: 'Saurabh',
        tags: ['angular', 'JS', 'frontend'],
        isPublished: true
    });

    try {
        // course.validate();
        const result = await course.save();
        console.log(result)
    } catch (exception) {
        console.error(exception)
    }
}

createCourse();

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function getCourses2() {
    const courses = await Course
        .find({ author: 'Saurabh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

async function getCourses3() {
    const courses = await Course
        // use ^ for starts with sau, query is case sensitive by default add i to make it case insensitive /^sau/i
        //.find({ author: /^sau/ }) 

        // use $ for ends with abh
        .find({ author: /abh$/i })

        // contains a pattern
        .find({ author: /.*rab.*/i })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

// getCourses3();

async function updateCourse(id) {
    const course = await Course.findById(id);

    if (!course) {
        console.error(`id: ${id} not found`);
        return;
    }
    // A way to do the update
    // course.isPublished = true;
    // course.author = 'Saurabh Thakur';

    course.set({
        isPublished: true,
        author: 'Saurabh Thakur'
    })

    const result = await course.save();
    console.log(result);
}

async function updateCourse2(id) {
    // const result = await Course.update({ _id: id }, {
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: 'Saurabh Singh Thakur 91',
            isPublished: true
        }
    });
    console.log(course);
}

async function removeCourse(id) {
    Course.deleteOne({ _id: id }); // deleteMany, findByIdAndRemove
}

// updateCourse2('5eb6d7593e26d662b323cf05');