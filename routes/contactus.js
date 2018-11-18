var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var credential = require('./credential')
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: credential.email,
      pass: credential.pass
  }
});
/* GET home page. */
router.post('/', function(req, res, next) {
    mailOptions = {
        from: "no-reply@harsh.page",
        to: req.body.email,
        subject: "Automated Response",
        html: "Hello,<br> Your Response has been recieved. <br><br> I will get back to you as soon as possible. <br> This is an auto generated email. Please, do not reply to this email. <br><br> Thank you, <br> Harsh Shah" 
      }

    mailOptions2 = {
    to: credential.email2,
    subject: "Request From Website:- Subject: " + req.body.subject,
    html: "From: " + req.body.email + "<br><br> Name: " + req.body.name + "<br><br> Subject: " + req.body.subject + " <br><br> Message: " + req.body.message
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
        console.log(error);
        res.render('index', { title: 'Harsh Shah' });
    } else {
        res.render('index', { title: 'Harsh Shah' });
        smtpTransport.sendMail(mailOptions2);
    }  
    });
});

module.exports = router;
