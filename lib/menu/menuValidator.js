export const validateItems = (items) => {
    /*
        * validate each item is following this model:
        * {
        *  name: String,
        *   price: String,
        *    image: String,

        *    additions: {
        type: Map,
        of: [String],
        },

        *   description: String,
        * }
    */

    if (!items) return false;
    items.forEach((item) => {
        if (!item.name || !item.description || !item.price) return false;
    });

    return true;
};

export const validateTitle = (title) => {
    return /^[a-zA-Z1-9]{1,12}$/.test(title); // english or numbers only length 1 to 12
};
