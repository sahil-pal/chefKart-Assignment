const messageBundle = require("../../locales/en");
const dbConn = require("../connect");
const Order = require('../models/order');
const moment = require("moment");
const {CART, PRODUCTS, USERS, ORDER} = require("../../utils/config").TABLES;
const orderid = require('order-id')('key');

module.exports = {
  
    async add(userID){
        let query1 = `SELECT C.productID, C.qty, U.address
                     FROM ${CART} as C inner join ${USERS} as U on C.userID=U.userID where C.userID=?`;
        var result1 = dbConn.promise().query(query1,userID);
        result1.then(function([rows]){
            var cartProducts = rows;
            const id = orderid.generate();
            if(cartProducts.length == 0){

            }
            else{
                var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                for(var i = 0; i < cartProducts.length; i++){
                    let query2 = `INSERT INTO ${ORDER} SET ?`;
                    const order = new Order(userID,id,mysqlTimestamp,cartProducts[i]);
                    var result2 = dbConn.promise().query(query2,order);
                    result2.then(function(value){
    
                    }).catch((err)=>{
                    console.log(err);
                    }); 
                }
            }
        }).catch((err)=>{
            console.log(err);
        });
        let query3 = `DELETE FROM ${CART} WHERE userID='${userID}'`;
        result = dbConn.promise().query(query3);
        return result;
    },

    async display(userID){
        let query = `SELECT * FROM ${ORDER} as C inner join ${PRODUCTS} as P on C.productID=P.productID where C.userID=?`;
        var result = dbConn.promise().query(query,userID);
        return result;
    },
    
};
  