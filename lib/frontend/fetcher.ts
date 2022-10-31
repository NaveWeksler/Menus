
const fetcher = {
    post: <Input=any, Output=any>(url: string, args: (Omit<RequestInit, "body"> & {body: Input})) => {
        return new Promise<{json: Output, status: number}>(async resolve => {
            const res = await fetch(url, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "csrf": "true" // csrf header defense for same origin
                },
                ...args,
                body: JSON.stringify({
                    ...args.body
                }) // overwrite args.body and body to string
                
            });

            const json = res.headers.get("content-type") === "application/json" ?  await res.json() as Output : null as Output;
            
            return resolve({json, status: res.status});
            
        }); // not done
    },
}

export default fetcher;