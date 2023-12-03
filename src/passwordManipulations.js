import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto"

const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16;

const key = (secret) => {
 return Buffer.from(createHash('sha256').update(String(secret)).digest('base64'), 'base64');
}

export const encrypt = (toBeEncrypted, secret) =>{ 
 let iv = randomBytes(IV_LENGTH);
 let cipher = createCipheriv(algorithm, Buffer.from(key(secret), 'hex'), iv);
 let encrypted = cipher.update(toBeEncrypted);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export const decrypt = (toBeDecrypted, secret) =>{ 
 let password = toBeDecrypted.split(':');
 let iv = Buffer.from(password.shift(), 'hex');
 let encryptedText = Buffer.from(password.join(':'), 'hex');
 let decipher = createDecipheriv(algorithm, Buffer.from(key(secret), 'hex'), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}