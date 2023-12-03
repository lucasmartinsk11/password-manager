import mysql from 'mysql'

export const createConnection = () =>{
 let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'postgres-db',
  password : 'docker',
  database : 'postgres'
 })
 return connection;
}