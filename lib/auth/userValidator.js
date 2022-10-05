const usernameRegex = new RegExp(
        `^[a-zA-Z0-9]{${parseInt(
            process.env.NEXT_PUBLIC_MIN_USERNAME
        )},${parseInt(process.env.NEXT_PUBLIC_MAX_USERNAME)}}$`
    ),
    passwordRegex = new RegExp(
        `^[a-zA-Z0-9]{${parseInt(
            process.env.NEXT_PUBLIC_MIN_PASSWORD
        )},${parseInt(process.env.NEXT_PUBLIC_MAX_PASSWORD)}}$`
    );

export const checkUser = (username, password) => {
    console.log(
        usernameRegex,
        passwordRegex,
        parseInt(process.env.NEXT_PUBLIC_MAX_PASSWORD),
        parseInt(process.env.NEXT_PUBLIC_MIN_PASSWORD),
        parseInt(process.env.NEXT_PUBLIC_MAX_USERNAME),
        parseInt(process.env.NEXT_PUBLIC_MIN_USERNAME)
    );
    //return true;
    return usernameRegex.test(username) && passwordRegex.test(password);
};

export const validUser = (username, password, name, familyName) => {
    return (
        checkUser(username, password) &&
        /^[a-zA-Z]{2,10}$/.test(name) &&
        /^[a-zA-Z]{2,10}$/.test(familyName)
    );
};
