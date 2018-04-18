var express=require('express');
var app=express();
var md5=require('./model/md5.js');
var formidable=require('formidable');
var db=require('./model/db.js');
var session=require('express-session');
var fs=require('fs');

app.use(express.static(__dirname+'/public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.get('/',function (req,res){
    res.redirect('./register.html')
})
app.post('/registered',function (req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files){
        if(err)throw err;
        db.find('register',{'name':fields.name},null,function (err,result){
            if(err)throw err;
            if(result!=0){
                res.send({'loginStatus':-1});
            }else{
                db.insertOne('register',fields,function (err,result){
                    if(err)throw err;
                    res.send({'loginStatus':1});
                })
            }
        })
    })
})

app.listen(80);