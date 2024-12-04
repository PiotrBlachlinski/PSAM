import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [animate, setAnimate] = useState(false);
  const [profileAnimate, setProfileAnimate] = useState(false);
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSearchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [searchOption, setSearchOption] = useState('Tytułu');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Sprawdzenie, czy użytkownik jest zalogowany
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/current", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Błąd podczas sprawdzania użytkownika:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setAnimate(true); // Animacja tekstu "Forum"
    const timer = setTimeout(() => {
      setProfileAnimate(true); // Opóźniona animacja sekcji profilu
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
    setSearchOptionsOpen(true); // Otwiera opcje wyszukiwania przy skupieniu
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchOptionsOpen(false); // Zamknij opcje wyszukiwania po krótkim czasie
    }, 200);
  };

  const handleLogout = () => {
    // Wylogowanie użytkownika i usunięcie sesji
    fetch("http://localhost:8080/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          navigate("/"); // Przekierowanie na stronę główną
        }
      })
      .catch((error) => {
        console.error("Błąd podczas wylogowywania:", error);
      });
  };

  return (
    <header className="flex justify-between">
      {/* Logo Section */}
      <Link
        to={user && (user.role === 'ADMIN' || user.role === 'MOD') ? "/modView" : "/"}
        className="flex items-center gap-1 relative group"
      >
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
        {isSearchOptionsOpen && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 rounded-md z-10">
            <div
              onClick={() => handleSearchOptionChange('Tytułu')}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                searchOption === 'Tytułu' ? 'font-bold' : ''
              }`}
            >
              Tytułu
            </div>
            <div
              onClick={() => handleSearchOptionChange('Nazwie użytkownika')}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                searchOption === 'Nazwie użytkownika' ? 'font-bold' : ''
              }`}
            >
              Nazwie użytkownika
            </div>
            <div
              onClick={() => handleSearchOptionChange('Tagach')}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                searchOption === 'Tagach' ? 'font-bold' : ''
              }`}
            >
              Tagach
            </div>
          </div>
        )}
        <div className="relative flex-grow flex items-center border border-gray-300 rounded-full p-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Wyszukaj po ${searchOption}`}
            className="flex-grow border-none focus:outline-none text-sm px-2"
            onFocus={handleFocus}
            onBlur={handleBlur}
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
              Wyszukaj
            </span>
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div
        className={`flex gap-2 border border-grey-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 slide-in ${
          profileAnimate ? 'visible' : ''
        }`}
      >
        <Link
          to={user ? "/postAdd" : "/login"}
          className="relative group flex items-center gap-1 cursor-pointer"
        >
          {/* Przycisk nowego posta */}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>

            <span className="fixed left-auto -translate-x-1/2 translate-y-full bottom-0 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Nowy post
            </span>
          </div>
        </Link>
      </div>

      {/* Profile Section */}
      <div
        className={`flex gap-2 border border-gray-300 rounded-full py-1 px-2 ${
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
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            {user ? <span>{user.username}</span> : <span>Konto</span>}
          </div>
          {isAccountMenuOpen && (
            <div className="absolute left-0 top-full mt flex flex-col bg-white border border-gray-200 rounded-md w-48 z-10">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Wyloguj
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>

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
          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full mt flex flex-col bg-white border border-gray-200 rounded-md w-48 z-10">
              {user ? (
                <>
                  <Link
                    to={user.role === 'ADMIN' ? "/admin" : "/profile"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profil użytkownika
                  </Link>
                </>
              ) : (
                <p className="block px-4 py-2 text-gray-700">
                  Zaloguj się, aby skorzystać z tej funkcji.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
