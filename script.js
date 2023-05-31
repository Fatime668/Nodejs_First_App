const express = require('express')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

let posts = require('./models/posts')
let comments = require('./models/comments')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    res.send('Hello world')
})

//getAllPosts
app.get('/api/posts',function(req,res){
    res.send(posts)
})
//GetById   
app.get('/api/posts/:id',function(req,res){
    let id = req.params.id

    let post = posts.find(p=>p.id==id)
    if (post) {
        res.json(post)
    }else{
        res.status(404).json({'message':"Not Found!"})
    }

})
//CreatePost
app.post('/api/posts',function(req,res){
    let title = req.body.title
    let body = req.body.body
    let newPost = {
        id:Math.floor(Math.random()*1000),
        title:title,
        body:body,
        likeCount:Math.floor(Math.random()*1000)
    }
    posts.push(newPost)
    res.status(201).json(newPost)
})

//get-postComment
app.get('/api/posts/:id/comments',function(req,res){
    let id = req.params.id
    let existedComments = comments.filter(c=>c.postId==id)
    if (existedComments) {
        res.json(posts) 
    }else{
        res.status(404).json({"message":"404 Not found!"})
    }
})
//get-username="fatima"
app.get('/api/comments/:username',function(req,res){
    let username = req.params.username
    let existedUsername = comments.filter(c=>c.username == username)
    if (existedUsername) {
        res.send(existedUsername)
    }else{
        res.status(404).json({"message":"404 Not found!"})
    }
})
//UpdatePost
app.put('/api/posts/:id',function(req,res){
    let id=req.params.id
    let existedId = posts.find(p=>p.id == id)
    if (existedId) {
        existedId.title = req.body.title
        existedId.body = req.body.body

        res.send(posts)
    }else{
        res.status(404).json({"message":"404 Not found" })
    }

})
//DeletePost
app.delete('/api/posts/:id',function(req,res){
    let id = req.params.id
    posts  =  posts.filter(p=>p.id != id)
    res.send("Success !!!")
})
app.listen(8080,function(){
    console.log('Server is running ...');
})
