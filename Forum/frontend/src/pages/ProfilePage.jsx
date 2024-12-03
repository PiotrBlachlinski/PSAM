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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col w-full items-center p-4">
      {/* Karta profilu */}
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
          <h2 className="text-xl font-bold mb-4">Edytuj profil</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Nazwa użytkownika</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tło</label>
            <input
              type="file"
              name="background"
              accept="image/*"
              onChange={handleFileChange}
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
    </div>
  );
};

export default UserProfile;
