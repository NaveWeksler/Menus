
export const checkUser = (username, password) => {
    return /^[a-zA-Z0-9]{3,10}$/.test(username) && /^[a-zA-Z0-9]{5,18}$/.test(password);
}

export const validUser = (username, password, name, familyName) => {
    return checkUser(username, password) && /^[a-zA-Z]{2,10}$/.test(name) && /^[a-zA-Z]{2,10}$/.test(familyName);
}