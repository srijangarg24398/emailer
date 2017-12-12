var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
// var fs=require('fs');
// var path=require('path');

// directory = path.dirname("");
// var parent = path.resolve(directory, '..');
// var uploaddir = parent + (path.sep) + 'emailprj' + (path.sep) + 'public' + (path.sep) + 'images' + (path.sep);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Email' });
});

router.post('/new',(req,res)=>{
    // console.log(req,res);
    // var file = req.files;
    // console.log(file[0].originalname)
    // fs.writeFile(uploaddir + file[0].originalname, file[0].buffer,     function(err) {
    //     console.log("filewrited")
    //     console.log(err)
    // })
    // var filepath = path.join(uploaddir, file[0].originalname);
    // console.log(filepath)

	var data={
		myemail : req.body.fromemail,
		mypassword : req.body.password,
		toemail : req.body.toemail,
		subject : req.body.subject,
		content : req.body.content
	};
	let transporter = nodemailer.createTransport({
        service: 'gmail',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: data.myemail,
            pass: data.mypassword,
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: data.myemail,
        to: data.toemail,
        subject: data.subject,
        text: data.content,
        html: '<h3>'+data.content+'</h3>'/*,
        attachments: [{
            filename: file[0].originalname,
            streamSource: fs.createReadStream(filepath)
        }]*/
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        	res.send(error.response);
            return console.log(error);
        }
        else{
        	// console.log(transporter);
        	res.send("Email Sent");
        	// res.send("Transporter"+transporter);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    // res.redirect_to('/')
})

module.exports = router;
