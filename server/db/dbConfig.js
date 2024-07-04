const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  // socketPath: process.env.DB_SOCKETPATH,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
});

// console.log(process.env.USER);
// dbConnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbConnection.promise();
