const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3])
});

app.get('/api/courses/:id', (req,res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening from port ${port}...`));