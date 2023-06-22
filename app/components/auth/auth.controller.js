const { createError  , createResponse } = require('../../utils/helpers');
const userService = require('./../../services/userService');
class authController{
  async sign(req,res){
    try { 
        const payload = req.body;
        console.log(payload);
        const user = await userService.addUser(payload);
        if(user){
            createResponse(res,'ok' , 'login successfully' , user )

        }else {
        createError(res, {}, { message: 'Invalid Credentials' });
      }
        
    } catch (e) {
        createError(res,e);
    }
  }
}
 const controller = new authController();
 module.exports = controller;