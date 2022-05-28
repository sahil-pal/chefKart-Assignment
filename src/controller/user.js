const User = require('../db/models/user');
const messageBundle = require("../locales/en");
const userServices = require('../db/services/user_crud');
const {SUCCESS,SERVER_ERROR} = require('../utils/config').STATUS_CODES;

const userController = {

    addUser(request,response) {
        const userData = new User(request.body);
        try {
            const result = userServices.add(userData);
            result.then(()=>{
              response
                .status(SUCCESS)
                .json({
                  //status : SUCCESS,
                  message : messageBundle["UserInsertion.success"]
                });
            })
            .catch((err)=>{
              response
                .status(SUCCESS)
                .json({message : messageBundle["UserInsertionDuplicate.success"]});
            });
        } catch (err) {
            response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["UserInsertion.failed"]});
        }  
    }

}

module.exports = userController;