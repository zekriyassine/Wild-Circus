const connection = require('../conf');
const express = require('express');
const userRouter = express.Router();

userRouter.get('/comments', (req,res)=>{
    connection.query('select * from comments',(err,result)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
        }
        res.json(result)
    })
})

userRouter.post('/new-comment',(req,res)=>{
    const formData = req.body
    connection.query('INSERT INTO comments set?',formData,(err,result)=>{
        if(err){
            res.sendStatus(500)
            console.log(err)
        } else {
            res.status(200).send('Commentaire rajouter')
        }

    })
})

module.exports = userRouter;