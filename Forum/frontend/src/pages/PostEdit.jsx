import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../Header";

export default function PostEdit() {
  const { postId } = useParams(); // Pobierz ID posta z parametrów URL
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    image: null,
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories([
          { id: 1, name: "Polityka" },
          { id: 2, name: "Memy" },
          { id: 3, name: "Pogoda" },
        ]);
      } catch (error) {
        console.error("Błąd przy pobieraniu kategorii:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch post data to edit
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const postData = await response.json();
          setFormData({
            title: postData.title,
            content: postData.content,
            categoryId: postData.category.id,
            image: null,
          });
        } else {
          console.error("Nie udało się pobrać danych posta. Status:", response.status);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu danych posta:", error);
      }
    };

    fetchPostData();
  }, [postId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/current", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setFormData((prev) => ({ ...prev, userId: userData.userId }));
          setUser(userData);
        } else {
          console.error("Nie udało się pobrać danych użytkownika. Status:", response.status);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu danych użytkownika:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, image: files[0] }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("categoryId", formData.categoryId);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: formDataToSend,
      });

      if (response.ok) {
        if (user.role === "USER") {
            navigate("/profile"); // Redirect to home page
          } else if (user.role === "MOD") {
            navigate("/profile"); // Redirect to profile page
          } else if (user.role === "ADMIN") {
            navigate("/admin"); // Redirect to admin page
          }
      } else {
        console.error("Nie udało się zaktualizować wpisu. Status:", response.status);
      }
    } catch (error) {
      console.error("Błąd przy aktualizacji wpisu:", error);
    }
  };

  const handleCancel = () => {
    if (user.role === "USER") {
      navigate("/profile"); // Redirect to profile page
    } else if (user.role === "MOD") {
      navigate("/profile"); // Redirect to profile page
    } else if (user.role === "ADMIN") {
      navigate("/adminPage"); // Redirect to admin page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <br />
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Edytuj wpis</h2>

          {/* Post title input */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                Tytuł wpisu
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900"
                  placeholder="Tytuł"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Post content input */}
            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm/6 font-medium text-gray-900">
                Treść
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows="3"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                  value={formData.content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            {/* Category selection */}
            <div className="sm:col-span-4">
              <label htmlFor="categoryId" className="block text-sm/6 font-medium text-gray-900">
                Kategoria
              </label>
              <div className="mt-2">
                <select
                  id="categoryId"
                  name="categoryId"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="">Wybierz kategorię</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Post picture */}
            <div className="col-span-full">
              <label htmlFor="file-upload" className="block text-sm/6 font-medium text-gray-900">
                Zdjęcie (opcjonalne)
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg
                    className="mx-auto size-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
            type="button"
            onClick={handleCancel}
            className="relative group text-sm/6 font-semibold text-gray-900"
            >
            Cancel
        </button>

        {/* Save button, saves post to database */}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
