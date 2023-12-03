
import { ArgumentParser } from 'argparse';
import { read } from 'read'
import bcrypt from "bcrypt";
import { auth } from "./auth.js"
import { encrypt, decrypt } from './passwordManipulations.js';
import { createConnection } from './dbConnection.js';

const main = async () => {
 const parser = new ArgumentParser({
  description:"Password Manager Vault: Create, Add, and Delete URL, Usernames, and Passwords", usage:"[options]"
 });

 let mPass = Buffer.from(await read({ prompt: 'Password: ', silent: true })).toString('base64');
 let secondFactorAuth = Buffer.from('Highway to hell').toString('base64');
 let masterPasswordPlusSFA = mPass+secondFactorAuth;

 if(auth(masterPasswordPlusSFA)){
  console.log("Authenticated...");
 }else{
  console.log("Authentication failed...");
  return;
 }

 const connection = createConnection();
 connection.connect();

 //console.log(encrypt("oi",masterPlusSfa));
 //console.log(decrypt("deca28da40bc6dc76570ed268e42fada:f993",masterPlusSfa))

 parser.add_argument("-a", "--add", {type: 'str', nargs: 2, help: "Add new entry", metavar: ("[URL]", "[USERNAME]")});
 parser.add_argument("-q", "--query", {type: 'str', nargs: 1, help: "Look up entry by URL", metavar: ("[URL]")});
 parser.add_argument("-l", "--list", {action: "store_true", help: "List all entries in password vault"});
 parser.add_argument("-d", "--delete", {type: 'str', nargs: 1, help: "Delete entry by URL", metavar: ("[URL]")});
 parser.add_argument("-ap", "--add_password", {type: 'str', nargs: 3, help: "Add manual password", metavar: ("[URL]", "[USERNAME]", "[PASSWORD]")}); 
 parser.add_argument("-uurl", "--update_url", {type: 'str', nargs: 2, help: "Update a URL", metavar: ("[NEW_URL]", "[OLD_URL]")});
 parser.add_argument("-uuname", "--update_username", {type: 'str', nargs: 2, help: "Update a username in account", metavar: ("[URL]", "[NEW_USERNAME]")}); 
 parser.add_argument("-upasswd", "--update_password", {type: 'str', nargs: 2, help: "Update a password in account", metavar: ("[URL]", "[NEW_PASSWORD]")});

 const args = parser.parse_args()

 if (args.add) {
  let URL = args.add[0]
  let username = args.add[1]
  let password = password_generator.password_gen(20) // criar password generator
  password_official = master_password.encrypt_password(password, master_password_hash)
  cursor.execute(sql.insert_db_row(), (URL, username, password_official))
  console.log("Record Added:" + "\n URL: {0}, Username: {1}, Password: {2} (Plaintext Password)".format(URL, username, password))
  console.log("Record Added:" + "\n URL: {0}, Username: {1}, Password: {2} (Encrypted Ciphertext to be Stored)".format(URL, username, password_official))
  connection.end();
 }

//  if (args.delete) {
//   const URL = args.delete[0];
//   const sqlDeleteQuery = "DELETE FROM Vault WHERE URL = ?";
//   cursor.execute(sqlDeleteQuery, [URL]);
// }

// if (args.add_password) {
//   const URL = args.add_password[0];
//   const username = args.add_password[1];
//   const password = args.add_password[2];
//   const passwordOfficial = masterPassword.encryptPassword(password, masterPasswordHash);
//   const insertQuery = sql.insertDbRow();
//   cursor.execute(insertQuery, [URL, username, passwordOfficial]);
//   console.log("Record added with custom password.");
//   connection.end();
// }

// if (args.update_url) {
//   const newURL = args.update_url[0];
//   const oldURL = args.update_url[1];
//   const updateUrlQuery = sql.updateDbUrl();
//   cursor.execute(updateUrlQuery, [newURL, oldURL]);
//   connection.end();
// }

// if (args.update_username) {
//   const newUsername = args.update_username[0];
//   const URL = args.update_username[1];
//   const updateUsernameQuery = sql.updateDbUsername();
//   cursor.execute(updateUsernameQuery, [newUsername, URL]);
//   connection.end();
// }

// if (args.update_password) {
//   console.log("Please type in old password: ");
//   const newPassword = args.update_password[0];
//   const URL = args.update_password[1];
//   const updatePasswordQuery = sql.updateDbPassword();
//   cursor.execute(updatePasswordQuery, [newPassword, URL]);
//   connection.end();
// }

// if (args.list) {
//   cursor.execute("SELECT * FROM Vault");
//   const record = cursor.fetchall();
//   record.forEach(entry => {
//       entry.forEach((value, index) => {
//           const titles = ["URL: ", "Username: ", "Password: "];
//           if (titles[index] === "Password: ") {
//               const bytesRow = value;
//               const password = masterPassword.decryptPassword(bytesRow, masterPasswordHash);
//               console.log("Password: " + password.toString('utf-8'));
//           } else {
//               console.log(titles[index] + value);
//           }
//       });
//       console.log("----------");
//   });
//   connection.end();
// }

};

main();