import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Pay() {
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const name = searchParams.get("name");
    const id = searchParams.get("id");

    return (
        <div>
            <div className="flex gap-5 justify-start items-center pt-14 pb-6">
                <div className="font-medium w-10 h-10 rounded-full flex justify-center items-center bg-green-500 text-white">{name[0]}</div>
                <div className="font-bold text-lg">{name}</div>
            </div>
            <div className="font-bold text-gray-600 pb-2 pl-2">Amount (in Rs)</div>
            <input onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount" className="border rounded-lg p-2 w-full" />
            <div className="flex justify-around">
                <button onClick={async()=>
                    await axios.post("http://localhost:3000/api/v1/account/transfer",
                        {
                            amount,
                            to: id
                        },{
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                } className="bg-green-500 font-medium shadow text-white rounded-md w-max py-1 px-3 mt-7 mb-3">Initiate Transfer</button>
                <button onClick={() => {
                    navigate("/dashboard");
                }} className="bg-gray-400 font-medium shadow text-white rounded-md w-max py-1 px-14 mt-7 mb-3">Back</button>
            </div>
        </div>
    );
}
