const mockRequest = (query = {}, cookies = {}, body = {}) => {
    /**
     * Object of `query` values from url
     * [key: string] : string | string[]
     */
    query,
        /**
         * Object of `cookies` from header
         * [key: string]: string
         */
        cookies,
        body;
};

const mockResponse = () => {
    const status = jest.fn(),
        redirect = jest.fn(),
        send = jest.fn(),
        json = jest.fn(),
        revalidate = jest.fn();

    const res = {
        /**
         * Send data `any` data in response
         */
        send: send,
        /**
         * Send data `json` data in response
         */
        json: json,
        status: status,
        redirect: redirect,
        revalidate: revalidate,
    };

    status.mockImplementation((_) => res);
    redirect.mockImplementation((_, _) => res);

    return { response: res, status, redirect, send, json, revalidate };
};

module.exports = { mockRequest, mockResponse };
