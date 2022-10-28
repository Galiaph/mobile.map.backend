import mysql from "mysql2";
  
// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'mobile',
  password: 'password',
  database: 'mobile'
});
 
export default db;
