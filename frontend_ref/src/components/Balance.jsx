import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
    const [balance, setBalance] = useState(0);

    useEffect(() => async function() {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        setBalance(await res.data.balance);
    })

    return (
        <div className="p-6 font-bold text-2xl">
            <h1>Your Balance {balance}</h1>
        </div>
    );
}
