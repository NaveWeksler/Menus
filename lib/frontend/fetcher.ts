
const fetcher = {
    post: <Input, Output>(url: string, args: (Omit<RequestInit, "body"> & {body: Input})) => {
        const argsInclude: RequestInit = {...args, body: JSON.stringify(args.body)}; // convert args to RequestInit to send

        return new Promise<{json: Output, status: number}>(async resolve => {
            const res = await fetch(url, {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                ...argsInclude
            });
            const json = await res.json() as Output;
            resolve({json, status: res.status});
        }); // not done
    },
    csrfToken: "",
}

export default fetcher;