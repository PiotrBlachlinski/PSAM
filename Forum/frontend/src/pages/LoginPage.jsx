import { Link } from "react-router-dom";


{/* Login form */}
export default function LoginPage() {
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    {/* Email input */}
                 <input type="text" placeholder="Email"/>
                    {/* Password input*/}
                 <input type="password" placeholder="Hasło"/>
                 
                {/* Login button */}
                {/* Requires adding redirection, depending on whether person logs in as user or moderator */}
                <button className="primary">Login</button> 

                <div className="text-center py-2 text-gray-500">
                {/* Link redirecting to register page */}
                Nie masz konta? <Link className="underline text-black" to={'/register'}>Zarejestruj się</Link>
                </div>

                </form>   
            </div>
        </div>
    );
}
