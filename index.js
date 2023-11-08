const Joi = require('joi');
const express = require('express');
const app = express();
var indexOf = require( 'utils-indexof' );

app.use(express.json());

const courses = [
    
   {id: 1, name: 'course1'},
   {id: 2, name: 'course2'}, 
   {id: 3, name: 'course3'},  
   {id: 4, name: 'course4'} 
];

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

//To get particular course
app.get('/api/courses/:id', (req,res) => {
    const course =  courses.find(c => c.id ===parseInt(req.params.id));

    if(!course){
        res.status(404).send('The course with the given ID was not found');
    }
    res.send(course)
});

const schema = Joi.object({
    name : Joi.string().min(3).required()
});

//to add new course
app.post('/api/courses', (req, res) => {

    const {error, value} = schema.validate(req.body);


    if(error){
        console.log(error);
        res.status.apply(400).send(result.error.details[0].message);
        return;
    }

    const course ={
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

//To update existing courses
app.put('/api/courses/:id', (req,res) => {

    const course =  courses.find(c => c.id ===parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found');
    }

    const {error, value} = schema.validate(req.body);

    if(error){
        res.status.apply(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

//To delete a particular course
app.delete('/api/courses/:id', (req,res) => {

    const course =  courses.find(c => c.id === parseInt(req.params.id));

    if(!course){
        res.status(404).send('The course with the given ID was not found');
    };

    const index = indexOf(courses, req.params.id);

    res.send(course); 

});

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening from port ${port}...`));