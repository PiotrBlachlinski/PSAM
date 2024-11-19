import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Sprawdzenie poprawności emaila
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Nieprawidłowy adres e-mail.");
            return;
        }

        // Sprawdzenie długości hasła oraz złożoności
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Hasło musi mieć co najmniej 8 znaków, jedną dużą literę i cyfrę.");
            return;
        }

        // Sprawdzenie, czy hasła są zgodne
        if (password !== confirmPassword) {
            setError("Hasła nie są zgodne.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setSuccess("Rejestracja zakończona sukcesem!");
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } else {
                const errorData = await response.text();
                setError(errorData || "Rejestracja nie powiodła się.");
            }
        } catch (err) {
            setError("Błąd serwera. Spróbuj ponownie później.");
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4">Rejestracja</h1>
                <form className="max-w-md mx-auto" onSubmit={handleRegister}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                    <input
                        type="text"
                        placeholder="Nazwa użytkownika"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Powtórz hasło"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="primary">Zarejestruj się</button>

                    <div className="text-center py-2 text-gray-500">
                        Masz już konto?{" "}
                        <Link className="underline text-black" to={"/login"}>
                            Zaloguj się
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
