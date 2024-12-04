import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
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
        console.log("Pobieranie danych użytkownika...");
        const response = await fetch("http://localhost:8080/api/users/current", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log("Dane użytkownika pobrane pomyślnie:", userData);
          setUser(userData);
          setFormData({
            username: userData.username,
            description: userData.description || "",
            profilePic: userData.profilePic,
            background: userData.background,
          });

          // Pobranie postów użytkownika
          fetchUserPosts();
        } else {
          console.error("Nie udało się pobrać danych użytkownika. Status:", response.status);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu danych użytkownika:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/current/posts", {
          credentials: "include",
        });
        if (response.ok) {
          const postsData = await response.json();
          setPosts(postsData);
        } else {
          console.error("Nie udało się pobrać postów użytkownika. Status:", response.status);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu postów użytkownika:", error);
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

  // Funkcja do usuwania postów
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Usunięcie posta z listy postów w stanie
        setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
      } else {
        console.error("Nie udało się usunąć wpisu. Status:", response.status);
      }
    } catch (error) {
      console.error("Błąd przy usuwaniu wpisu:", error);
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
      {/* Posty użytkownika */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Ostatnie wpisy</h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.postId} className="mb-4 flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-blue-600">{post.title || "Tytuł postu"}</h3>
                  <p className="text-sm text-gray-500">Utworzono {post.createdAt}</p>
                  <h1 className="text-lg font-semibold text-gray-800">{post.content}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span>Polubienia: {post.likes}</span>
                    <span>Niepolubienia: {post.dislikes}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Przycisk "Edytuj" przekierowuje do komponentu PostEdit */}
                  <Link to={`/postEdit/${post.postId}`} className="text-blue-500">
                    Edytuj
                  </Link>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeletePost(post.postId)}
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nie udostępniono żadnych wpisów.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
