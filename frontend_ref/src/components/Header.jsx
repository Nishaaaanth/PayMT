export default function Header({title, subtitle}) {
    return (
        <div className="text-black">
            <h2 className="font-bold text-4xl pt-6">{title}</h2>
            <h3 className="text-slate-500 text-md pt-3 pb-4">{subtitle}</h3>
        </div>
    );
}
