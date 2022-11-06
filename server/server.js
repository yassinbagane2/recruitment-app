const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const Admin = require('./Models/AdminModel')
const Application = require('./Models/Application.model')
const jwt = require('jsonwebtoken')
const upload = require('express-fileupload')
const { application } = require('express')
const app = express()

const fs = require('fs')
const path = require('path')

// middlewares
app.use(express.json());
app.use(cors());
app.use(upload());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, PATCH, DELETE ');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.post('/auth/admin', (req, res, next) => {
  const { email, password } = req.body;
  Admin.findOne({email})
    .then(admin => {
      if (!admin) return res.json({status: false, msg: 'Email Incorrect'});
      if (password === admin.password) {
        const accessToken = jwt.sign({
          adminId: admin._id
        },
        "adminsecretkey",
        {expiresIn: '1y'}
        );
        return res.status(200).json({status:true, token: accessToken });
      } else {
        return res.json({ status: false, msg: 'Password Incorrect'});
      }
      
    })
})

app.post('/user/application',(req, res, next) => {
  const { fullname, email, city, streetAddress, phoneNumber, about } = req.body;
  if (!req.files) {
    const error = new Error('CV Must Be Provided');
    error.statusCode = 422;
    throw error; 
  }
  const file = req.files.CV;
  const name = file.name;
  file.mv('./uploads/'+name, (err) => {
    if (err) return res.send(err)
  })

  const application = new Application({
    fullname,
    email,
    city,
    streetAddress,
    phoneNumber,
    about,
    CV: name
  });

  application.save()
    .then(result => {
      res.json({
        message: 'Application was sent succesfully.',
        application: result
      })
    }).catch(error => {
      next(error);
    });

})

app.get('/user/applications', (req, res, next) => {
  Application.find()
    .then(applications => {
      return res.status(200).json({message: 'Fetched Applications!', applications});
    }).catch(err => {
      next(err);
    })
})

app.get('/download',(req, res) => {
  const fileName = req.headers.filename
  console.log(fileName);
  res.download(path.join(__dirname,`./uploads/${fileName}`))
})






app.use((error, req, res, next) => {
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});


mongoose
  .connect(`mongodb+srv://yassinbagane2:52544318@cluster0.qollkp9.mongodb.net/recruiting`)
  .then(() => {
    app.listen(8080);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
});

