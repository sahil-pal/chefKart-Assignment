const messageBundle = require("../locales/en");
const orderServices = require('../db/services/order_crud');
const {SUCCESS,SERVER_ERROR} = require('../utils/config').STATUS_CODES;


const orderController = {

    addOrder(request,response) {
        const userID = request.body.userID;
        var result = orderServices.add(userID);
        result.then(function(value){
            if(value[0].affectedRows == 0){
                response
                .status(SUCCESS)
                .json({
                    message : messageBundle["CartProductNotFound.success"],
                });
              }
              else{
                response
                .status(SUCCESS)
                .json({
                    message : messageBundle["OrderInsertion.success"],
                });
            }
        }).catch((err)=>{
            response
                .status(SUCCESS)
                .json({
                    message : messageBundle["OrderInsertion.failed"],
            });
        });
    },

    displayOrders(request,response) {
        const userID = request.body.userID;
        try {
            var result = orderServices.display(userID);
            result.then(function([rows]){
              if(rows.length > 0){
                response
                  .status(SUCCESS)
                  .json({
                      message : messageBundle["OrdertDisplay.success"],
                      records : rows
                  });
              }
              else{
                response
                  .status(SUCCESS)
                  .json({
                      message : messageBundle["OrderEmpty.success"],
                  });
              }
            }
            ).catch((err)=>{
              console.log(err);
              response
                .status(SUCCESS)
                .json({message : messageBundle["OrderDisplay.failed"]});
            });
        } catch (err) {
          console.log(err);
            response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["OrderDisplay.failed"]});
        }  
    },

}

module.exports = orderController;