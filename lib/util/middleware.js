import connect from "lib/mongoHandler";

export const withDB = (next) => async (req, res) => {
    await connect();
    next(req, res);
}

const expectMethod = (next, type) => (req, res) => {
    if (req.method !== type) {
        res.status(400).send(`Expected ${type} Request`);
        return;
    }
    next();
}

/**
 * expect request type like GET or POST.
 * example:
 * const somePostRoute = rest.post((req, res) => {
 *  // post request only
 * })
*/
export const rest = {
    post: (next) => expectMethod(next, "POST"),
    get: (next) => expectMethod(next, "GET"),

}