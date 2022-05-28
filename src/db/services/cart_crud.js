const messageBundle = require("../../locales/en");
const dbConn = require("../connect");
const {CART,PRODUCTS} = require("../../utils/config").TABLES;

module.exports = {
  
    async add(cartData){
        let query = `INSERT INTO ${CART} SET ? `;
        var result = dbConn.promise().query(query,cartData);
        return result;
    },

    async display(userID){
        let query = `SELECT * FROM ${CART} as C inner join ${PRODUCTS} as P on C.productID=P.productID where C.userID=?`;
        var result = dbConn.promise().query(query,userID);
        return result;
    },

    async update(cartData){
        let query = `UPDATE ${CART} SET qty=${cartData.qty} WHERE userID='${cartData.userID}' AND productID =${cartData.productID}`;
        var result = dbConn.promise().query(query);
        return result;
    },

    async delete(cartData){
        let query = `DELETE FROM ${CART} WHERE userID='${cartData.userID}' AND productID=${cartData.productID}`;
        var result = dbConn.promise().query(query);
        return result;
    },
    
};
  