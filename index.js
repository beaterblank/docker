const express = require('express')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'docker.mail.me@gmail.com',
        pass:'docker1234'
    }
})

const app   = express()

var bodyparser = require('body-parser');
const text = require('body-parser/lib/types/text');
var urlencoder = bodyparser.urlencoded({extended:false})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Started! serving on port http://localhost:${PORT}`)})

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render("contactMe")
})

app.post('/',urlencoder,(req,res)=>{
    var mailOptions = {
        from:'docker.mail.me@gmail.com',
        to:'docker.mail.me@gmail.com',
        subject:req.body.sub,
        text:`${req.body.from} : ${req.body.content}`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error(error);
        }else{
            console.log(info.response);
        }
    })


    res.send(req.body)
})