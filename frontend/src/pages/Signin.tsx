import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 flex justify-center h-screen items-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <div className="flex justify-center">
                    <Header title="Signin" subtitle="Please provide the below information to Login" />
                </div>
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }} title="Email" placeholder="abc@gmail.com" />
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }} title="Password" placeholder="12345678" />
                <Button onClick={async () => {
                    const res = await axios.post("https://paymt-backend.nishanthubuntu.workers.dev/api/v1/user/signin", {
                        email,
                        password
                    })

                    try {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("email", email);
                        if (res.data.token != "") {
                            navigate("/dashboard");
                        }
                    } catch (err) {
                        console.log("error");
                    }
                }} label="Login" link="signup" sentence="Register an account? " linkTitle="Sign up" />
            </div>
        </div>
    );
}
