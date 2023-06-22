const mongoose = require('mongoose');
const httpOrg= require('http');
const express = require('express');
const app = express();
// const server = httpOrg.Server(app);
// const auth = require('./app/components/auth/auth.routes');
const routes = require('./app/routes');
routes(app);

const connect = require('./app/config/database');
const  env = require('./app/config/env');
// console.log(env.DB_CONNECTION_STRING);
mongoose.connect('mongodb://localhost:27017/sample_db')
  .then(() =>
   { console.log("Database connected")}
   )
  .catch((e) => {
    if (e.name === 'MongoParseError') {
      console.error(`\n\n${e.name}: Please set NODE_ENV to "production", "development", or "staging".\n\n`);
    } else if (e.name === 'MongoNetworkError') {
      console.error(`\n\n${e.name}: Please start MongoDB\n\n`);
    } else {
      console.log(e);
    }
  });
 console.log('test main')

  // server.listen(process.env.PORT, () => {
  //   console.log(
  //     '%s App is running at http://localhost:%d in %s mode',
  //     process.env.PORT,
  //     process.env.NODE_ENV,
  //   );
  //   console.log('  Press CTRL-C to stop\n');
  // });

  app.listen(3000, ()=> console.log('Listning in 3000 ....'));

  console.log("hello");