const messageBundle = require("../../locales/en");
const dbConn = require("../connect");
const {USERS} = require("../../utils/config").TABLES;

module.exports = {
  
    async add(userData){
        let query = `INSERT INTO ${USERS} SET ? `;
        let result;
        await dbConn.promise().query(query,userData,(err,res)=>{
            if(err){
                console.log('\n'+messageBundle["Query.error"]+err.sqlMessage);
                result = null;
            }
            else{
                console.log('\n'+messageBundle["Query.success"]);
                result = res.affectedRows;
            }
        });
        return result;
    },
    
};
  