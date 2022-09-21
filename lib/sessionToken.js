import {randomBytes} from 'crypto';

export const getSessionToken = () => { //Date.getTime();
    const sessionToken = randomBytes(32).toString('base64');
    const exp = new Date().getTime() + 7200000; //3,600,000 = 1h
    
    return sessionToken,exp;
}
