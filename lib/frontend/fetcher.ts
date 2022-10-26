
const fetcher = {
    post: <T extends Object>(url: string, args: {body: T}) => {
        // fetch(url, {
        //     headers: {
        //        'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     ...args
        // })
        return fetch(url) // not done
    },

    csrfToken: "",
    

}

export default fetcher;