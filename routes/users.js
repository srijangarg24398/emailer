var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Email = require('email-templates');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var email=new Email({
		service:'gmail',
		auth: {
            user: "email@gmail.com", // generated ethereal user
            pass: "password"  // generated ethereal password
        },
		message:{
			from:'"email" <email@gmail.com>'
		},
		transport: {
	    	jsonTransport: true
	  	},
	  	views: {
	    	options: {
	      		extension: 'ejs' // <---- HERE
	    	}
  		}
	});
	email.send({
		template:'directory',
		message: {
		    to: 'email@gmail.com'
		},
		locals: {
		    name: 'email'
		}
	}).then(console.log).catch(console.error);
    res.send("Message Sent");
});

module.exports = router;
