const express = require('express');
const app = express();
app.use(express.json());
const users = require('./users.json')

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./user-swagger.json');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/api/users', (req, res) => {
    res.json(users);
})
app.get('/api/users/:id', (req, res) => {
    const id = +req.params.id;
    const result = users.find(user => user.id === id);
    res.json(result);
})
app.get('/api/usersearch', (req, res) => {
    const name = req.query.name;
    const result = users.filter(user => user.name === name);
    res.json(result);
})
app.post('/api/user', (req, res) => {
    const payload = req.body;
    users.push(payload);
    res.send({ "statusCode": 201, "message": 'user added successfully!!!' })
})

app.listen(5000, () => {
    console.log('server runnign at 5000')
})

