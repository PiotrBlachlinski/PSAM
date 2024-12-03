import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Umożliwia przesyłanie ciasteczek sesji
            });

            if (response.ok) {
                // Pobierz aktualnego użytkownika po zalogowaniu
                const userResponse = await fetch("http://localhost:8080/api/users/current", {
                    credentials: "include",
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    if (userData.role === 'BLOCKED') {
                        setError("Twoje konto zostało zablokowane. Skontaktuj się z administratorem.");
                        return;
                    }
                    console.log("Zalogowano użytkownika:", userData);
                    if (userData.role === 'ADMIN' || userData.role === 'MOD') {
                        localStorage.setItem('role', userData.role);
                        navigate('/modView');
                        window.location.reload();
                    } else {
                        localStorage.setItem('role', userData.role);
                        navigate('/');
                        window.location.reload();
                    }
                } else {
                    console.error("Błąd przy pobieraniu danych użytkownika.");
                }
            } else {
                const errorMsg = await response.text();
                setError(errorMsg || "Nieprawidłowe dane logowania.");
            }
        } catch (err) {
            setError("Błąd serwera. Spróbuj ponownie później.");
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {/* Email input */}
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Login button */}
                    <button type="submit" className="primary">Login</button> 

                    <div className="text-center py-2 text-gray-500">
                        {/* Link to register page */}
                        Nie masz konta?{" "}
                        <Link className="underline text-black" to={'/register'}>
                            Zarejestruj się
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
