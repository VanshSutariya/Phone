const { createResponse, createError } = require('../utils/helpers');
const User = require('../models/user');
class userService{
    async addUser(payload){
        try{if(!payload)return
        const result = await User.create(payload);
        if(result){
          return result
        }
        return undefined;
        }catch(e){throw e}
      }
}
const service = new userService();
module.exports = service;