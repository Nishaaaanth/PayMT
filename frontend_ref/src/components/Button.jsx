import { Link } from "react-router-dom";

export default function Button({label, link, sentence, linkTitle, onClick}) {
    return (
        <div>
            <button onClick={onClick} className="bg-black text-white rounded-md w-full py-1 px-3 mt-7 mb-3">{label}</button>
			{link && <div className="text-slate-400 mb-6">{sentence}<Link to={link} className="text-black hover:text-slate-300 font-medium text-sm underline">{linkTitle}</Link></div>}
        </div>
    );
}
