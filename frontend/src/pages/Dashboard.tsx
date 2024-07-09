import Balance from "../components/Balance";
import Nav from "../components/Nav";
import Users from "../components/Users";

export default function Dashboard(){
    const user = localStorage.getItem("email");

    return (
        <div>
            <Nav user={user}/>
            <Balance />
            <Users username={user}/>
        </div>
    );
}
