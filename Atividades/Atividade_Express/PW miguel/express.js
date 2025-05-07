const express = require('express');
const app = express();
const port = 3000;

const registro = function (req,res,next) {
    console.log(`acesso à rota ${req.method} ${req.url}`)
    next()
}

app.use(registro)

app.get('/', (req,res) => {
    res.send('Home')
})

app.get('/about', (req,res) => {
    res.send('About')
}) 

app.post('/data', (req,res) => {
    res.send('Data')
})

app.get('/users', (req,res) => {
    res.send('Users')
})

app.get('/users/id', (req, res) => {
    res.send(`user ${req.params.id}`)
 })
 
 app.get('/users/signin', (req,res) => {
    res.send('Signin')

 })

 app.get('/users/signin/:userid', (req,res) => {
     res.send('Bem vindo ' + req.params.userid)
 })

 app.get('/users/signup', (req,res) =>{
     res.send('Signup')
 })

app.listen(port, ()=> {
    console.log(`escutando na porta${port}`)
}) 