import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [animate, setAnimate] = useState(false);
  const [profileAnimate, setProfileAnimate] = useState(false);
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSearchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [searchOption, setSearchOption] = useState('Post Name');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setAnimate(true); // Trigger "Forum" text animation
    const timer = setTimeout(() => {
      setProfileAnimate(true); // Delay profile section animation slightly
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuToggle = (setMenuOpen, isOpen) => {
    setMenuOpen(isOpen);
  };

  const toggleSearchOptions = () => {
    setSearchOptionsOpen(!isSearchOptionsOpen);
  };

  const handleSearchOptionChange = (option) => {
    setSearchOption(option);
    setSearchOptionsOpen(false);
  };

  const handleFocus = () => {
    setSearchOptionsOpen(true); // Open search options on input focus
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchOptionsOpen(false); // Close search options after a short delay
    }, 200);
  };

  return (
    <header className="flex justify-between">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-1 relative group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-10 ${animate ? 'tumbling' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
          />
        </svg>
        <span className="absolute left-1/2 -translate-x-1/2 translate-y-[52px] bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Strona główna
        </span>
        <span className={`font-bold text-l drop-in ${animate ? 'visible' : ''}`}>
          Forum
        </span>
      </Link>

      {/* Search Bar */}
      <div className="relative flex items-center gap-3">
        {/* Dropdown Menu */}
        {isSearchOptionsOpen && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 shadow-md rounded-md z-10">
            <div
              onClick={() => handleSearchOptionChange('Post Name')}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                searchOption === 'Post Name' ? 'font-bold' : ''
              }`}
            >
              Post Name
            </div>
            <div
              onClick={() => handleSearchOptionChange('Creator Name')}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                searchOption === 'Creator Name' ? 'font-bold' : ''
              }`}
            >
              Creator Name
            </div>
            {/* jeżeli nie obsługujemy tagów to do usunięcia */}
            <div 
              onClick={() => handleSearchOptionChange('Tags')}  
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                searchOption === 'Tags' ? 'font-bold' : ''
              }`}
            >
              Tags
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative flex-grow flex items-center border border-gray-300 rounded-full p-3">
          <input
            type="text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search by ${searchOption}`}
            className="flex-grow border-none focus:outline-none text-sm px-2"
            onFocus={handleFocus} // Open search options on input focus
            onBlur={handleBlur} // Close search options after a small delay
          />
          <button className="relative group">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span className="absolute left-auto -translate-x-1/2 translate-y-[40px] bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Search
            </span>
          </button>
        </div>
      </div>
{/* Przejście do tworzenia nowego wpisu*/}
<div
        className={`flex gap-2 border border-grey-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 slide-in ${
          profileAnimate ? 'visible' : ''
        }`}
      >
        <Link to="/postAdd" className="relative group flex items-center gap-1 cursor-pointer">
          {/* Przycisk nowego posta */}
          <div>
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
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          
          <span className="fixed left-auto -translate-x-1/2 translate-y-full bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Nowy post
          </span>
          </div>
          
        </Link>
      </div>
      {/* Profile Section */}
      <div
        className={`flex gap-2 border border-grey-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 slide-in ${
          profileAnimate ? 'visible' : ''
        }`}
      >
        {/* Account Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleMenuToggle(setAccountMenuOpen, true)}
          onMouseLeave={() => handleMenuToggle(setAccountMenuOpen, false)}
        >
          <div className="flex items-center gap-1 cursor-pointer">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span>Account</span>
          </div>
          {isAccountMenuOpen && (
            <div className="absolute left-0 top-full mt flex flex-col bg-white border border-gray-200 shadow-lg rounded-md w-48 z-10">
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Rejestracja
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logowanie
              </Link>
            </div>
          )}
        </div>

        <div className="border-l border-gray-300"></div>

        {/* Profile Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleMenuToggle(setProfileMenuOpen, true)}
          onMouseLeave={() => handleMenuToggle(setProfileMenuOpen, false)}
        >
          <div className="flex items-center gap-1 cursor-pointer">
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span>Profil</span>
          </div>

          {/* Zależnie od tego czy zalogowany jest moderator czy zwykłu użytkownik, wyświetlać określone przyciski */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full mt flex flex-col bg-white border border-gray-200 shadow-lg rounded-md w-48 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </Link>
              <Link
                to="/modView"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Widok moderatora
              </Link>
              <Link
                to="/IndexPage"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
