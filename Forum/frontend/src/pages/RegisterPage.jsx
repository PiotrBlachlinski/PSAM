import { Link } from "react-router-dom";

{/* Register form */}
export default function RegisterPage() {
    return(
        <div className="mt-4 pt-10 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Rejestracja</h1>
                <form className="max-w-md mx-auto">
                    {/* Username input */}
                 <input type="text" placeholder="Nazwa użytkownika"/>

                    {/* Email input */}
                 <input type="text" placeholder="Email"/>

                    {/* Password input */}   
                 <input type="password" placeholder="Hasło"/>

                    {/* Repeat password input */}
                 <input type="password" placeholder="Powtórz hasło"/>
                    
                    {/* Register button, adds user to the database */}
                <button className="primary">Zarejestruj się</button>

                <div className="text-center py-2 text-gray-500">

                    {/* Link to login page */}
                Masz już konto? <Link className="underline text-black" to={'/login'}>Zaloguj się</Link>
                </div>

                </form>   
            </div>
        </div>
    );
}
