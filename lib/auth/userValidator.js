const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    passwordRegex = new RegExp(
        `^[a-zA-Z0-9]{${parseInt(
            process.env.NEXT_PUBLIC_MIN_PASSWORD
        )},${parseInt(process.env.NEXT_PUBLIC_MAX_PASSWORD)}}$`
    );

export const checkUser = (email, password) => {
    return emailRegex.test(email) && passwordRegex.test(password);
};

export const validUser = (email, password, name, lastName) => {
    return (
        checkUser(email, password) &&
        /^[a-zA-Z]{2,10}$/.test(name) &&
        /^[a-zA-Z]{2,10}$/.test(lastName)
    );
};
