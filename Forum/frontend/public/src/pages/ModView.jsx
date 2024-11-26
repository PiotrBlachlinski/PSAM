import { useState } from "react"; 
import { Link } from "react-router-dom";
import Header from "../Header"; 

export default function ModView() {
  // State to track the image size (preview or full)
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image === selectedImage ? null : image); // Toggle image size
  };

  return (
    <div>
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-11">
          Moderacja postów
        </h1>
        
        {/* Placeholder for Posts */}
        <div className="space-y-8">
          {/* posts */}
          {[1, 2, 3, 4, 5, 6].map((post, index) => {
            const postImage = `https://via.placeholder.com/300x150?text=Post+Image`; // Placeholder image
            const fullSizeImage = `https://via.placeholder.com/600x300?text=Post+Image`; // Full-size image
            const hasImage = index % 2 === 0; // Some posts will have images

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
              >
                {/* Post Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {/* User avatar */}
                    <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
                    <div className="text-sm font-semibold text-gray-900">User {post}</div> {/*Username here*/}
                  </div>
                  <div className="text-xs text-gray-500">2 hours ago</div>{/*if you have timesamps in database they go here*/}
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Post Title {post}</h2>
                  <p className="text-gray-600 mb-4">
                    This is a placeholder for the post body. It will contain more content such as text, images, or other rich media.
                    This space will eventually be filled with actual posts as the app progresses.
                  </p>

                  {/* Conditionally render image if available */}
                  {hasImage && (
                    <div className="mb-4">
                      <img 
                        src={selectedImage === fullSizeImage ? fullSizeImage : postImage} 
                        alt={`Post ${post}`} 
                        className="w-full h-auto object-cover rounded-md cursor-pointer"
                        onClick={() => handleImageClick(fullSizeImage)} // Handle click to toggle image size
                      />
                    </div>
                  )}

                  {/* Post stats (like upvotes or comments) if you know how to implement that, 
                  then here is the place to connect it to if u don't want to or don't have time just cut this part */}

                  {/* Like button */}
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <button className="flex items-center justify-center p-2 bg-transparent hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                      </button>
                      <span>20</span>{/*like numbers Here*/}
                    </div>

                    {/* Dislinke button */}
                    <div className="flex items-center space-x-1">
                      <button className="flex items-center justify-center p-2 bg-transparent hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                          />
                        </svg>
                      </button>
                      <span>10</span> {/*dislike numbers Here*/}
                    </div>


                    {/* "Delete post" button */}
                    <div className="flex items-center space-x-1">
                      <button className="flex items-center justify-center p-2 bg-transparent text-gray-500 rounded relative group hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6">

                          <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <span className="absolute left-0 -translate-y-[35px] bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Usuń post
                        </span>
                      </button>
                      
                    </div>

                    {/* "Ban user" button */}
                    <div className="flex items-center roundede relative">
                      <button className="flex items-center justify-center p-2 bg-transparent text-gray-500 rounded relative group hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6">
    
                          <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                        <span className="absolute left-0 -translate-y-[35px] bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Zbanuj użytkownika
                        </span>
                      </button>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}