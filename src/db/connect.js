const mysql = require('mysql2');

  // create connection
  const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  dbConnection.connect((err)=>{
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error(err);
        process.exit(1);
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error(err);
      }
      if (err.code === 'ECONNREFUSED') {
        // console.log('Database connection was refused.')
        // logger.log('error', 'Database connection was refused.', err)
        console.error(err);
        process.exit(1);
      }
      if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error(err);
        process.exit(1);
      }
    }
    console.log('Connected to MySQL Database');
  });


  module.exports = dbConnection;
