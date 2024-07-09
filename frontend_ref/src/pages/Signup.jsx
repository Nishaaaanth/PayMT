import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 flex justify-center h-screen items-center">
            <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
                <Header title="Signup" subtitle="Enter your information to create an account" />
                <Input onChange={(e) => {
                    setFirstName(e.target.value);
                }} title="First Name" placeholder="john" />
                <Input onChange={(e) => {
                    setLastName(e.target.value);
                }} title="Last Name" placeholder="doe" />
                <Input onChange={(e) => {
                    setUsername(e.target.value);
                }} title="Username" placeholder="johndoe@gmail.com" />
                <Input onChange={(e) => {
                    setPassword(e.target.value);
                }} title="Password" placeholder="12345678" />
                <Button onClick={async() => {
                    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        firstName,
                        lastName,
                        username,
                        password
                    });

                    try {
                        localStorage.removeItem("token");
                        const token = res.data.token;
                        localStorage.setItem("token", token);
                        navigate("/dashboard");
                    } catch(err) {
                        console.log("Error");
                    }
                }} label="Register" link="/" sentence="Already have an account? " linkTitle="Sign in" />
            </div>
        </div>
    );
}
