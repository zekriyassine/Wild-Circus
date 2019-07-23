const  express  =  require('express');
const  bodyParser  =  require('body-parser');

const  app  =  express(); 

var userRouter = require('./routes/users');


app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));


 
 app.use('/users', userRouter); 

 
 //je lance le serveur node
 let  server  =  app.listen( process.env.PORT  ||  4000, function(){
    console.log('Listening on port '  +  server.address().port);
 });

