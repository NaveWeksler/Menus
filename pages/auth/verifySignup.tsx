import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const VerifySignup: NextPage = (props) => {
    const {email} = useRouter().query; //
    const [token, setToken] = useState("");

    const moveForword = (event) => {

        if (event.target.value.length === 1) {
            setToken(token + event.target.value);
            if (event.target.nextElementSibling) event.target.nextElementSibling.focus();
        }
    }

    const moveBackward = (event) => {
        if (event.key === "Backspace" && event.target.value.length === 0 && event.target.previousElementSibling) event.target.previousElementSibling.focus();
    }

    const verify = () => {
        fetch("/api/auth/signup/verifyEmail", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                token
            })
        })
    }

    return (
       <div className="w-[100%] h-[100%] flex flex-col items-center">
            <p className="text-light">An email with verification code was sent to '{email}'</p>
            <div className="w-[75%] flex items-center justify-evenly h-[20%]">
                {[1,2,3,4,5,6].map((value) => (
                    <input key={value.toString()} className="border text-lg w-[5vmin] h-[5vmin] text-center" maxLength={1} type="text" onChange={moveForword} onKeyDown={moveBackward}/>
                ))}
            </div>
            <button onClick={verify} className="px-6 py-2 ml-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">Verify</button>
       </div>
    );
}

export default VerifySignup;