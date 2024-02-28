import mysql from "mysql2";
  
// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mobile_test',
  password: 'eEQMZYvdDsqeOzn',
  database: 'mobile2',
  timezone: '+3:00'
});
 
export default db;
