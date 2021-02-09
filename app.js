const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

var generalRoutes = require('./routes/generalRoutes');


const app = express();

app.use('/', generalRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/ajax/email", function(request, response) {
    // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
              user: "vincentonoja@gmail.com", // this should be YOUR GMAIL account
              pass: "kalakuta123kalakuta123" // this should be your password
          }
      });
  
      var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
      var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
      var mail = {
          from: "vincentonoja@gmail.com", // sender address
          to: "pyeramid.cc@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
          subject: "Mail From Contact Form", // Subject line
          text: textBody,
          html: htmlBody
      };
  
      // send mail with defined transport object
      transporter.sendMail(mail, function (err, info) {
          if(err) {
              console.log(err);
              response.json({ message: "message not sent: an error occured; check the server's console log" });
          }
          else {
              response.json({ message: `message sent: ${info.messageId}` });
          }
      });
  });

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => console.log('server ReadableStreamDefaultReader...'));