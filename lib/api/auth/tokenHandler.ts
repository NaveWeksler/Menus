import {randomBytes} from 'crypto';

export const getSessionToken = () => { //Date.getTime();
    const token = randomBytes(parseInt(process.env.SESSION_BYTES) | 0).toString('base64');
    return token;
}

export const getSessionExpireMs = () => {
    return new Date().getTime() + (parseInt(process.env.SESSION_EXP_MS) | 0); //3,600,000 = 1h 7200000
}
