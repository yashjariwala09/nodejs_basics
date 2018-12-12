const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app=express();
hbs.registerPartials(__dirname +'/views/partial');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    res.render('maintenance');
});
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to append to server.log')
        }
    });
    console.log(log);
    next();
});
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase(); 
});
app.get('/',(req,res)=>{
//    res.send('<h1>Hello1 Express!</h1>');
    res.render('home',{
        pageTitle:'Home Page',
        welcome:'Hi there!'  
    });
});

app.get('/maintene',(req,res)=>{
   res.render('about',{
       pageTitle:'About Page'
   }); 
});
app.get('/about',(req,res)=>{
   res.render('about',{
       pageTitle:'About Page'
   }); 
});
app.get('/bad',(req,res) =>{   
   res.send({Error:'Page not found'}); 
});

app.listen(8000,()=>{
    console.log("server started on port 8000");
});