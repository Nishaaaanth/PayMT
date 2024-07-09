import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 flex justify-center h-screen items-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <div className="flex justify-center">
                    <Header title="Signin" subtitle="Please provide the below information to Login" />
                </div>
                <Input onChange={(e) => {
                    setUsername(e.target.value)
                }} title="Username" placeholder="johndoe@gmail.com" />
                <Input onChange={(e) => {
                    setPassword(e.target.value)
                }} title="Password" placeholder="12345678" />
                <Button onClick={async () => {
                    const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password
                    })

                    try {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("username", username);
                        navigate("/dashboard");
                    } catch (err) {
                        console.log("error");
                    }
                }} label="Login" link="signup" sentence="Register an account? " linkTitle="Sign up" />
            </div>
        </div>
    );
}
