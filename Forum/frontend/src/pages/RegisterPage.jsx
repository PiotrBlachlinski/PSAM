import { Link } from "react-router-dom";

export default function RegisterPage() {
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Rejestracja</h1>
                <form className="max-w-md mx-auto">
                 <input type="text" placeholder="Nazwa użytkownika"/>
                 <input type="password" placeholder="Hasło"/>
                 <input type="password" placeholder="Powtórz hasło"/>
                <button className="primary">Zarejestruj się</button>

                <div className="text-center py-2 text-gray-500">
                Masz już konto? <Link className="underline text-black" to={'/login'}>Zaloguj się</Link>
                </div>

                </form>   
            </div>
        </div>
    );
}