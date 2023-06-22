const path = require('path');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file
 */
const envPostFix = process.env.APP_ENV ? `.${process.env.APP_ENV}` : '';

dotenv.config({
  path: path.resolve(__dirname, `../../.env${envPostFix}`),
});
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  ENV: process.env.APP_ENV,
  APP_BASE_URL: process.env.APP_BASE_URL,
  PORT: process.env.PORT,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  EXPRESS_SECRET: process.env.EXPRESS_SECRET,
  MAX_RESPONSE_TIME: process.env.MAX_RESPONSE_TIME || 10000,
};

