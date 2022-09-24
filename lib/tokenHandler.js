import {randomBytes} from 'crypto';

export const getSessionToken = () => { //Date.getTime();
    const sessionToken = randomBytes(parseInt(process.env.SESSION_BYTES) | 0).toString('base64');
    const exp = new Date().getTime() + (parseInt(process.env.SESSION_EXP_MS) | 0); //3,600,000 = 1h 7200000
    
    return sessionToken,exp;
}

export const getCSRFToken = () => { //Date.getTime();
    return randomBytes(parseInt(process.env.CSRF_BYTES) | 0).toString('base64');
}
