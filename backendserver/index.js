// server.js
var express = require('express');
var app = express()
const jsonServer = require('json-server')
const middles = require('./middles');
var path = require("path")
const lodash = require("lodash");
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
var cors = require('cors')
var bodyParser=require('body-parser');
server.use(middlewares)
server.use(cors())
server.use(jsonServer.bodyParser)
const jwt = require('jsonwebtoken');
var users = [
    {
        username:'praveen',
        password:'123',
        userId:12
    },
    {
        username:'prateek',
        password:'222',
        userId:47
    },
    {
        username:'alok',
        password:'333',
        userId:17
    },
]
server.post("/login",function(req,res){
    console.log(req.body)
    var s = users.find(function(a){
        if(a.username===req.body.username && a.password===req.body.password){
            return true
        }
    })
    if(s){
        const token = jwt.sign(req.body, "some secret");
        console.log(token)
        res.json({token:token});
    }
    else{
        console.log("erro")
        res.json({err:'passwordnotmatched'})
    }
})
function authenticate(req,res,next){
    console.log("auth middleware called",req.headers)
    try{
        var isTokenValid = jwt.verify(req.headers.authorization.split(' ')[1],"some secret")
        next()
    }
    catch(err){
        res.send({err:'token mismatched'})
    }
}

server.use(authenticate)

server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running on 4000')
})