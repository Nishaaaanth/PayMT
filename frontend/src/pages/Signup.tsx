import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 flex justify-center h-screen items-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Header title="Signup" subtitle="Enter your information to create an account" />
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFirstName(e.target.value);
                }} title="First Name" placeholder="john" />
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setLastName(e.target.value);
                }} title="Last Name" placeholder="doe" />
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }} title="Email" placeholder="abc@gmail.com" />
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }} title="Password" placeholder="12345678" />
                <Button onClick={async () => {
                    try {
                        const res = await axios.post("https://paymt-backend.nishanthubuntu.workers.dev/api/v1/user/signup", {
                            firstName,
                            lastName,
                            email,
                            password
                        });

                        localStorage.removeItem("token");
                        const token = res.data.token;
                        localStorage.setItem("token", token);
                        navigate("/dashboard");
                    } catch (err) {
                        console.log("Error while signing up");
                    }
                }} label="Register" link="/" sentence="Already have an account? " linkTitle="Sign in" />
            </div>
        </div>
    );
}
