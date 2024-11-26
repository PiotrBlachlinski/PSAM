import { Link } from "react-router-dom"
import Header from "../Header";
import React from "react";


const UserProfile = () => {
    // Przykładowe dane użytkownika (zamienić z realnymi danymi pobieranymi z bazy danych)
    const user = {
      name: "Adam Nowak",
      email: "anowak@gmail.com",
      bio: "Opis użytkownika.",
      profilePicture: "https://via.placeholder.com/150",
      posts: [
        { id: 1, title: "Przykładowy post 1", likes: 10, dislikes: 2, content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", date: "2024-11-15" },
        { id: 2, title: "Przykładowy post 2", likes: 23, dislikes: 6, content: "Treść posta", date: "2024-10-10" },
      ],
    };
  
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col w-full items-center p-4">
          {/* Profile Card */}
          <div
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative"
            style={{
              backgroundImage: "url(https://placehold.co/400x400)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              padding: "25px",
            }}
          >
               {/* Change Banner Button */}
 <button
      className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
      onClick={() => {
        console.log("Change banner button clicked!"); // Add backend logic here
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M2.25 21.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    </button>
            <div className="absolute top-0 left-0 w-full h-full rounded-lg"></div>
            <div className="relative flex items-center gap-4">
              <div className="relative group">
                <img
                  src={user.profilePicture}
                  alt={`${user.name} profile`}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center text-white text-sm rounded transition-opacity opacity-0 group-hover:opacity-100"
                  onClick={() => {
                    console.log("Change icon button clicked!"); // Placeholder for connection
                    }}
                >
                  Change Icon
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">{user.name}</h1>
                <p className="text-sm text-black">{user.email}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-500">{user.bio}</p>
          </div>
    
          {/* User Posts */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ostatnie wpisy</h2>
            {user.posts.length > 0 ? (
              <ul>
                {user.posts.map((post) => (
                  <li
                    key={post.id}
                    className="mb-4 flex justify-between items-start"
                  >
                    {/* Left Content: Title, Date, and Content */}
                    <div className="flex flex-col">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-blue-600">{post.title}</h3>

                      {/* Post creation date */}
                      <p className="text-sm text-gray-500">Utworzono {post.date}</p>

                      {/* Post content */}
                      <h1 className="text-lg font-semibold text-gray-800">{post.content}</h1>

                      {/* Likes and Dislikes */}
                      <div className="flex flex-col gap-2">
                      <span></span>

                        {/* Likes */}
                        <div className="flex items-center gap-2">
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
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                          </svg>
                          <span>{post.likes}</span>

                          {/* Dislikes */}
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
                              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                          </svg>
                          <span>{post.dislikes}</span>
                        </div>
                        
                      </div>
                    </div>


                    {/* Right Actions: Edit and Delete Links */}
                    <div className="flex flex-col gap-2">

                      {/* Edit post button with link to "edit post" page */}
                      <Link to="/postAdd" className="relative group p-1">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                          <span className="absolute left-0 -translate-x-[60px] translate-y-[10px] bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Edytuj
                          </span>
                        </div>
                      </Link>

                      {/* Delete post button */}
                      <button className="flex items-center justify-center p-1 text-black rounded relative group">
                        <div>
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="size-6 w-6 h-6">
                          
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <span className="absolute left-0 -translate-x-[60px] translate-y-[10px] bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Usuń
                        </span>
                        </div>
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


