import bcrypt from "bcrypt";

export const auth = (masterPassword) =>{
 const mHash = "$2b$10$CdPZT4auHxvyGncjcljAZeli26aiT54FcsjVbanYZ93hMKkMKiFNe" 
  if (bcrypt.compareSync(masterPassword,mHash)){
   return true;
  } 
 return false;
}

