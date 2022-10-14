import { rejects } from 'assert';
import { scrypt, randomBytes } from 'crypto';
const debug = require('debug')('pswStorage');

export const comparePsw = async (plainPsw, storedHashedPsw, salt) => {
    // argon2 not in crypto so scrypt https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
    const plainHashSalt = await storePsw(plainPsw, salt);
    return plainHashSalt === storedHashedPsw; // hashed with fixed length so === should be fine
};

export const storePsw = (plainPsw, salt) => {
    return new Promise((res, rej) =>
        scrypt(plainPsw, salt, 64, (err, key) => {
            if (err) {
                debug('store error: ', err);
                return rej();
            }
            res(key.toString('base64'));
        })
    );
};
