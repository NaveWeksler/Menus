import { scrypt } from 'crypto';
const debug = require('debug')('pswStorage');

export const comparePsw = async (
	plainPsw: string,
	storedHashedPsw: string,
	salt: string
) => {
	// argon2 not in crypto so scrypt https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
	const plainHashSalt = await storePsw(plainPsw, salt);
	return plainHashSalt === storedHashedPsw; // hashed with fixed length so === should be fine
};

export const storePsw = (plainPsw: string, salt: string) => {
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
