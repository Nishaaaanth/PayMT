import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function User({ userId, firstName, title, dp }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between -my-4">
            <div className="flex items-center gap-5">
                <div className="font-bold w-10 h-10 rounded-full flex justify-center items-center bg-slate-100">{dp.toUpperCase()}</div>
                <div className="font-bold">{title}</div>
            </div>
            <Button onClick={async() => {
                navigate(`/sendmoney?id=${userId}&name=${firstName}`); 
            }} label="Send Money" />
        </div>
    );
}
