const express = require('express');
const signin = require('../components/auth/auth.routes');
module.exports = (app)=> {
  console.log('test routes')
  app.use(express.json());

  app.use('/auth' , signin)
} 