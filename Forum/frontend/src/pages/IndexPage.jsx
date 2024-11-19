import React, { useEffect, useState } from "react";

export default function IndexPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users");
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania użytkowników");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Lista użytkowników:</h2>
            {error && (
                <p className="text-red-500">
                    Wystąpił błąd: {error}
                </p>
            )}
            {!error && users.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID użytkownika</th>
                            <th className="border border-gray-300 px-4 py-2">Nazwa użytkownika</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id}>
                                <td className="border border-gray-300 px-4 py-2">{user.user_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p>Nie znaleziono żadnych użytkowników.</p>
            )}
        </div>
    );
}
