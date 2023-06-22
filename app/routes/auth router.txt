const express = require('express');
// Init Router
const router = express.Router();
const passport = require('passport');
const PassportErrorHandler = require('../../middleware/passportErrorResponse');
const AuthController = require('./auth.controller');
const AuthValidations = require('./auth.validations');

/**
 * @route POST api/auth/signin
 * @description Sign in with phone and password
 * @returns JSON
 * @access public
 */
router.post('/login', AuthValidations.signIn, (req, res) => {
  AuthController.signIn(req, res);
});

/**
 * @route POST api/auth/signup-new
 * @description Sign up User
 * @returns JSON
 * @access public
 */
router.post('/signup', AuthValidations.signUp, (req, res) => {
  AuthController.signUp(req, res);
});

/**
 * @route GET api/auth/secure
 * @description Get list of media for a project
 * @returns JSON
 * @access public
 */
router.get(
  '/secure',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    return res.status(200).json({
      status: 'ok',
      message: 'Success',
      data: {},
    });
  },
);

/**
 * @route POST api/auth/forgot-password
 * @description forgot password
 * @returns JSON
 * @access public
 */
router.post('/forgot-password', AuthValidations.forgotPassword, (req, res) => {
  AuthController.forgotPassword(req, res);
});

/**
 * @route POST api/auth/reset-password
 * @description reset password
 * @returns JSON
 * @access public
 */
router.post('/reset-password', AuthValidations.resetPassword, (req, res) => {
  AuthController.resetPassword(req, res);
});

module.exports = router;
