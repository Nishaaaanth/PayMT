import Pay from "../components/Pay";

export default function SendMoney() {
    return (
        <div className="flex justify-center items-center h-screen bg-sky-100">
            <div className="w-96 bg-white rounded-lg p-6 h-max shadow-2xl">
                <h1 className="font-bold text-3xl flex justify-center">Send Money</h1>
                <Pay />
            </div>
        </div>
    );
}
