import { Link } from "react-router-dom";

export default function LoginPage() {
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                 <input type="text" placeholder="Nazwa użytkownika"/>
                 <input type="password" placeholder="Hasło"/>
                <button className="primary">Login</button>

                <div className="text-center py-2 text-gray-500">
                Nie masz konta? <Link className="underline text-black" to={'/register'}>Zarejestruj się</Link>
                </div>

                </form>   
            </div>
        </div>
    );
}