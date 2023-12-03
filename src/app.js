
import { ArgumentParser } from 'argparse';
import { read } from 'read'
import { auth } from "./auth.js"
import { encrypt, decrypt } from './passwordManipulations.js';
import { generate } from 'generate-password';
import {createConnection} from './dbConnection.js';

const main = async () => {
 const parser = new ArgumentParser({
  description:"Password Manager Vault: Create, Add, and Delete URL, Usernames, and Passwords", usage:"[options]"
 });

 let mPass = Buffer.from(await read({ prompt: 'Password: ', silent: true })).toString('base64');
 let secondFactorAuth = Buffer.from('Highway to hell').toString('base64');
 let masterPasswordPlusSFA = mPass+secondFactorAuth;
 let dbConnection;

 if(auth(masterPasswordPlusSFA)){
  console.log("Authenticated...");
  dbConnection = createConnection();
 }else{
  console.log("Authentication failed...");
  return;
 }

 parser.add_argument("-a", "--add", {type: 'str', nargs: 2, help: "Add new entry", metavar: ("[URL]", "[USERNAME]")});
 parser.add_argument("-q", "--query", {type: 'str', nargs: 1, help: "Look up entry by URL", metavar: ("[URL]")});
 parser.add_argument("-l", "--list", {action: "store_true", help: "List all entries in password vault"});
 parser.add_argument("-d", "--delete", {type: 'str', nargs: 1, help: "Delete entry by URL", metavar: ("[URL]")});
 parser.add_argument("-ap", "--add_password", {type: 'str', nargs: 3, help: "Add manual password", metavar: ("[URL]", "[USERNAME]", "[PASSWORD]")}); 

 const args = parser.parse_args()

 if (args.add) {
  let url = args.add[0]
  let user_name = args.add[1]
  let password = generate({
   length: 20,
   numbers: true,
   symbols: true
  })
  let secrect_key = encrypt(password, masterPasswordPlusSFA)
  await dbConnection.insert({url, user_name, secrect_key}).into("passwords")
  .then(()=>{})
  .finally(()=>{
   console.log('Add!');
  })
  .catch(err => console.log(err));
  process.exit();
 }

 if (args.query) {
  var url = args.query[0];
  let result
  await dbConnection.select('url',  'user_name', 'secrect_key').from("passwords").where({url: url})
  .then(data=>{
   result = data[0]
  })
  .catch(err=>console.log(err));
  if (result) {
   console.log("Record:\n URL: %s, Username: %s, Password: %s", result.url, result.user_name, decrypt(result.secrect_key,masterPasswordPlusSFA));
 } else {
     console.log("Could not find record matching the value of '%s'", url);
 }
 process.exit();
}

 if (args.delete) {
  let url = args.delete[0];
  await dbConnection.delete().from('passwords').where({url: url})
  .then(()=>console.log("Deleted!"))
  .catch(err=>console.log(err));
  process.exit();
}

if (args.add_password) {
  const url = args.add_password[0];
  const user_name = args.add_password[1];
  const password = args.add_password[2];
  const secrect_key = encrypt(password, masterPasswordPlusSFA);
  await dbConnection.insert({url, user_name, secrect_key}).into("passwords")
  .then(()=>{})
  .finally(()=>{
   console.log('Add!');
  })
  .catch(err => console.log(err));
  process.exit();
}

if (args.list) {
 let result
 await dbConnection.select('url',  'user_name', 'secrect_key').from("passwords")
 .then(data=>{
  result = data
 })
 .catch(err=>console.log(err));

  result.forEach(entry => {
   console.log("Record:\n URL: %s, Username: %s, Password: %s", entry.url, entry.user_name, decrypt(entry.secrect_key,masterPasswordPlusSFA));
   console.log("----------");
  });
  process.exit();
}
};

main();