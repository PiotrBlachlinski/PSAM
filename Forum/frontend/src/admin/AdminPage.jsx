import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    profilePic: null,
    background: null,
  });
  const [users, setUsers] = useState([]); // Lista użytkowników dla admina
  const [editedRoles, setEditedRoles] = useState({}); // Przechowuje tymczasowe zmiany ról
  const [password, setPassword] = useState(""); // Hasło do potwierdzenia zmiany roli na admina
  const navigate = useNavigate(); // Hook do przekierowania

  useEffect(() => {
    // Pobranie danych użytkownika
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/current", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData({
            username: userData.username,
            description: userData.description || "",
            profilePic: null,
            background: null,
          });
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu danych użytkownika:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        credentials: "include",
      });
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Błąd przy pobieraniu listy użytkowników:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchAllUsers(); // Pobierz listę użytkowników tylko dla admina
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("description", formData.description);
    if (formData.profilePic) formDataToSend.append("profilePic", formData.profilePic);
    if (formData.background) formDataToSend.append("background", formData.background);

    try {
      const response = await fetch("http://localhost:8080/api/users/update", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode(false);
      } else {
        console.error("Nie udało się zaktualizować danych użytkownika.");
      }
    } catch (error) {
      console.error("Błąd przy aktualizacji danych użytkownika:", error);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setEditedRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleConfirmRoleChange = async (userId) => {
    const newRole = editedRoles[userId];
    if (newRole === "ADMIN" && !window.confirm("Czy na pewno chcesz nadać temu użytkownikowi rolę ADMIN? Zostaniesz zdegradowany do roli USER.")) {
      return;
    }
    if (newRole === "ADMIN" && !password) {
      alert("Musisz podać hasło, aby potwierdzić zmianę roli na ADMIN.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/role`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ role: newRole, password: newRole === "ADMIN" ? password : "" }),
      });
      if (response.ok) {
        setEditedRoles((prev) => {
          const updated = { ...prev };
          delete updated[userId];
          return updated;
        });
        if (newRole === "ADMIN") {
          // Degradacja obecnego admina do USER i przekierowanie na stronę główną
          setUser((prevUser) => ({ ...prevUser, role: "USER" }));
          navigate("/");
        }
        fetchAllUsers(); // Odśwież listę użytkowników
      } else {
        console.error("Nie udało się zmienić roli użytkownika.");
      }
    } catch (error) {
      console.error("Błąd przy zmianie roli użytkownika:", error);
    }
  };

  const handleCancelRoleChange = (userId) => {
    setEditedRoles((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full items-center p-4">
      {!editMode ? (
        <div
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative"
          style={{
            backgroundImage: user.background
              ? `url(data:image/jpeg;base64,${user.background})`
              : "url(https://placehold.co/400x400)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "25px",
          }}
        >
          {/* Przycisk edycji */}
          <button
            className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 text-white p-4 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center"
            style={{ zIndex: 10 }}
            onClick={() => setEditMode(true)}
          >
            Edytuj
          </button>
          <div className="relative flex items-center gap-4">
            <div className="relative group">
              <img
                src={
                  user.profilePic
                    ? `data:image/jpeg;base64,${user.profilePic}`
                    : "https://via.placeholder.com/150"
                }
                alt={`${user.username} profile`}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">{user.username}</h1>
              <p className="text-sm text-black">{user.email}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-500">
            {user.description ? user.description : "Brak opisu użytkownika."}
          </p>
        </div>
      ) : (
        /* Formularz edycji */
        <form
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          {/* Formularz edycji */}
          <h2 className="text-xl font-bold mb-4">Edytuj profil</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Nazwa użytkownika</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="Podaj swoją nazwę użytkownika"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Opis</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Napisz coś o sobie..."
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Zdjęcie profilowe</label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }))
              }
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tło</label>
            <input
              type="file"
              name="background"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, background: e.target.files[0] }))
              }
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Zapisz
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setEditMode(false)}
            >
              Anuluj
            </button>
          </div>
        </form>
      )}

      {/* Sekcja admina */}
      {user.role === "ADMIN" && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Zarządzanie użytkownikami</h2>
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nazwa użytkownika</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Rola</th>
                <th className="p-4 text-left">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId} className="border-t">
                  <td className="p-4">{u.userId}</td>
                  <td className="p-4">{u.username}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    {editedRoles[u.userId] ? (
                      <select
                        value={editedRoles[u.userId]}
                        onChange={(e) => handleRoleChange(u.userId, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="USER">USER</option>
                        <option value="MOD">MOD</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="BLOCKED">BLOCKED</option>
                      </select>
                    ) : (
                      u.role
                    )}
                  </td>
                  <td className="p-4">
                    {editedRoles[u.userId] ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleConfirmRoleChange(u.userId)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Zatwierdź
                        </button>
                        <button
                          onClick={() => handleCancelRoleChange(u.userId)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Anuluj
                        </button>
                        {editedRoles[u.userId] === "ADMIN" && (
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Potwierdź hasło"
                            className="border px-2 py-1 rounded ml-2"
                          />
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(u.userId, u.role)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Zmień rolę
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
