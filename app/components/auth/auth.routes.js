const express = require('express');
// Init Router
const router = express.Router();
const AuthController = require('./auth.controller');
const AuthValidations = require('./auth.validations');

/**
 * @route POST api/auth/signin
 * @description Sign in with phone and password
 * @returns JSON
 * @access public
 */

router.post('/signup', AuthValidations.signUp, (req, res) => {
  console.log("req",req.body) ||
  AuthController.sign(req, res);
});

module.exports = router;
