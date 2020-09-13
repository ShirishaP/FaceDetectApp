const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors= require ('cors');
var knex = require('knex');
const register = require ('./Controllers/register');
const signIn = require ('./Controllers/signIn');
const profile = require ('./Controllers/profile');
const image = require ('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'SiriReddy05!',
      database : 'smartbrain'
    }
  });

db.select('*').from('users').then(data=>{
    //console.log(data)
});


const app= express();
app.use(bodyParser.json());
app.use(cors());
const database = {
    users:[
        {
            id:123,
            name: 'kaile',
            password:'Kaile123',
            email: '123@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id:456,
            name: 'katie',
            password:'Katie456',
            email: '456@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'987',
            hash:'',
            email:'987@gmil.com'
        }
        

    ]
}

app.get ('/',(req,res)=>{
    res.send(database.users);
})
app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db,bcrypt)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db,bcrypt)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/
app.listen( process.env.PORT || 5000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})