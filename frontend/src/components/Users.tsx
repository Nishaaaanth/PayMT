import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

export default function Users({username}) {
    const [users, setUser] = useState([]);
    const [filter, setFilter] = useState("");
    try {
        useEffect(() => async function() {
            const res = await axios.get(`https://paymt-backend.nishanthubuntu.workers.dev/user?filter=${filter}`)
            setUser(await res.data.user);
        }, [filter]);
    } catch (err) {
        console.log("error in filtering");
    }

    return (
        <div className="px-6">
            <h1 className="font-bold text-2xl">Users</h1>

            <input onChange={(e) => {
                setFilter(e.target.value);
            }} className="rounded-lg font-medium mt-6 mb-8 w-full p-2 border" type="text" placeholder="Search users..." />

            <div>
                {users.filter(user => !user.username.includes(username)).map((user, key) => (
                    <User userId={user._id} firstName={user.firstName} key={key} title={`${user.firstName} ${user.lastName}`} dp={user.username[0]} />
                ))}
            </div>
        </div>
    );
}
