export default function Nav({user}) {
    const username = user.split("@")[0];

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <h1 className="font-bold text-3xl">Payments App</h1>
            <div className="flex items-center justify-between gap-6">
                <h3 className="text-xl text-black font-medium">Hello, {username}</h3>
                <div className="font-bold w-10 h-10 rounded-full flex justify-center items-center bg-slate-100">{user[0].toUpperCase()}</div>
            </div>
        </div>
    );
}
