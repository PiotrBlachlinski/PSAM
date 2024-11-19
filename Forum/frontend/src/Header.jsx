import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
    const [user, setUser] = useState(null); // Przechowuje dane zalogowanego użytkownika
    const navigate = useNavigate();

    // Sprawdzenie, czy użytkownik jest zalogowany
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users/current", {
                    credentials: "include", // Umożliwia przesyłanie ciasteczek sesji
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Błąd podczas sprawdzania sesji:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    // Wylogowanie użytkownika
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setUser(null); // Usuń dane użytkownika z klienta
                navigate("/login"); // Przekierowanie na stronę logowania
            } else {
                console.error("Błąd podczas wylogowywania");
            }
        } catch (error) {
            console.error("Błąd podczas wylogowywania:", error);
        }
    };

    return (
        <header className="flex justify-between">
            {/* Przycisk przejścia na główną stronę */}
            <Link to={"/"} className="flex items-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                </svg>
                <span className="font-bold text-l">Forum</span>
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        {/* Wyświetlanie nazwy użytkownika */}
                        <span className="text-sm font-medium">Witaj, {user.username}!</span>
                        {/* Przycisk wylogowania */}
                        <button
                            onClick={handleLogout}
                            className="border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300"
                        >
                            Wyloguj się
                        </button>
                    </>
                ) : (
                    <div className="flex gap-2">
                        {/* Linki rejestracji i logowania */}
                        <Link to={"/register"} className="border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                            Rejestracja
                        </Link>
                        <Link to={"/login"} className="border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                            Logowanie
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
