const Cart = require('../db/models/cart');
const messageBundle = require("../locales/en");
const cartServices = require('../db/services/cart_crud');
const {SUCCESS,SERVER_ERROR} = require('../utils/config').STATUS_CODES;

const cartController = {

    addToCart(request,response) {
        const cartData = new Cart(request.body);
        try {
            const result = cartServices.add(cartData);
            result.then(function(value){
              response
                .status(SUCCESS)
                .json({message : messageBundle["CartProductInsertion.success"]});
            })
            .catch((err)=>{
              if(err.errno == 1452){
                response.status(SUCCESS).json({message : messageBundle["CartProductInvalidInsertion.success"]});
              }
              else{
                response.status(SUCCESS).json({message : messageBundle["CartProductDuplicateInsertion.success"]});
              }
            });
        } catch (err) {
            response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["CartProductInsertion.failed"]});
      }  
    },

    displayCart(request,response) {
        const userID = request.body.userID;
        try {
            var result = cartServices.display(userID);
            result.then(function([rows]){
              if(rows.length > 0){
                response
                  .status(SUCCESS)
                  .json({
                      message : messageBundle["CartProductDisplay.success"],
                      records : rows
                  });
              }
              else{
                response
                  .status(SUCCESS)
                  .json({
                      message : messageBundle["CartProductEmpty.success"],
                  });
              }
            }
            ).catch((err)=>{
              console.log(err);
              response
                .status(SUCCESS)
                .json({message : messageBundle["CartProductDisplay.failed"]});
            });
        } catch (err) {
          console.log(err);
            response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["CartProductDisplay.failed"]});
        }  
    },

    updateCart(request,response) {
      const updatedCartData = new Cart(request.body);
      try {
          var result = cartServices.update(updatedCartData);
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
                  message : messageBundle["CartProductUpdated.success"],
              });
            }
          }
          ).catch((err)=>{
            response
              .status(SUCCESS)
              .json({message : messageBundle["CartProductUpdated.failed"]});
          });
        } catch (err) {
          console.log(err);
            response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["CartProductUpdated.failed"]});
        }  
    },

    deleteFromCart(request,response) {
      const data = {
        'userID' : request.body.userID,
        'productID' : request.body.productID
      }
      try {
          var result = cartServices.delete(data);
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
                  message : messageBundle["CartProductDeletion.success"],
              });
            }
        }
        ).catch((err)=>{
          response
            .status(SUCCESS)
            .json({message : messageBundle["CartProductDeletion.failed"]});
        });
        }catch (err) {
          response
            .status(SERVER_ERROR)
            .json({ message: messageBundle["CartProductDeletion.failed"]});
      }  
    }

}

module.exports = cartController;