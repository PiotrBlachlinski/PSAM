import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import Header from "../Header"; 

export default function IndexPage() {
  // State to track posts from the database
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts from the server...");
        const response = await fetch("http://localhost:8080/posts", {
          credentials: "include",
        });
        if (response.ok) {
          const postsData = await response.json();
          console.log("Posts fetched successfully:", postsData);
          setPosts(postsData);
        } else {
          console.error("Nie udało się pobrać postów z bazy danych. Status:", response.status);
        }
      } catch (error) {
        console.error("Błąd przy pobieraniu postów:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image === selectedImage ? null : image); // Toggle image size
  };

  return (
    <div>
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-11">
          Latest Posts
        </h1>
        
        {/* Map over posts fetched from the database */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              {/* Post Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {/* User avatar */}
                  <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
                  <div className="text-sm font-semibold text-gray-900">{post.user.username}</div>
                </div>
                <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
              </div>

              {/* Post Content */}
              <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.category.name}</h3>
                <p className="text-gray-600 mb-4">
                  {post.content}
                </p>

                {/* Conditionally render image if available */}
                {post.image && (
                  <div className="mb-4">
                    <img 
                      src={`http://localhost:8080/posts/${post.postId}/image`} 
                      alt={`Post ${post.postId}`} 
                      className="w-full h-auto object-cover rounded-md cursor-pointer"
                      onClick={() => handleImageClick(`http://localhost:8080/posts/${post.postId}/image`)} // Handle click to toggle image size
                    />
                    <p className="text-xs text-gray-500">Image is rendered successfully.</p>
                  </div>
                )}

                {/* Post stats (like upvotes or comments) */}
                <div className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <button className="flex items-center justify-center p-2 bg-transparent hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-400">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                      </svg>
                    </button>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="flex items-center justify-center p-2 bg-transparent hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="w-6 h-6 text-gray-400">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                      </svg>
                    </button>
                    <span>{post.dislikes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
