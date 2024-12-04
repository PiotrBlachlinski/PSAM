-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Gru 2024, 15:04
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `forumdb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `description`, `created_at`) VALUES
(1, 'polityka', NULL, '2024-11-04 14:07:15'),
(2, 'memy', NULL, '2024-11-04 14:08:06'),
(3, 'pogoda', NULL, '2024-11-04 14:08:27');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` tinytext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `likes` int(11) DEFAULT 0,
  `dislikes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`, `likes`, `dislikes`) VALUES
(1, 1, 2, 'coś', '2024-11-04 13:56:00', '2024-11-04 13:56:00', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comment_votes`
--

CREATE TABLE `comment_votes` (
  `vote_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vote_type` varchar(10) DEFAULT NULL CHECK (`vote_type` in ('like','dislike')),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` tinytext NOT NULL,
  `image` tinyblob DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `likes` int(11) DEFAULT 0,
  `dislikes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `category_id`, `title`, `content`, `image`, `created_at`, `updated_at`, `likes`, `dislikes`) VALUES
(1, 1, 1, 'Polityk diobel', 'coś bez żadnej ciekawej informacji, polityk b zły', 0x52494646a4a70100574542505650382098a70100f0a4089d012a400684033e6d3296482422a7a9a411fae9300d89656d38f6df8fedc67bfdba43ffe4965ffef5cdc3f97541c5865465a3fd3f05c563bdbe52f667fb2e4d5e55fade15c722ff5bbee3ae7fd1eaabce9ffb8e9b3e6e34a5ff8fd0bff39e96ffc465666a8e1bb95f3bff2fe6e7b93724f97df51f2dff8ff9cdff7f93bf1bff97ce03a87ff37f9cfcdef95fff8ff6efe07fec2ffd5fe83f7ffe877fa17f88fda9ff31f04fff7feda7c3afeedffa7d5eff65ff8ffb81ee91ff57f69fe00ff41ff63fb69fef3e433fa1ff82fff7ed97ff8bdaa3fc5ffddffffee57fb7fffe7ff5fb77fef4fc4dff6f, '2024-11-04 13:54:52', '2024-11-04 13:54:52', 0, 1000),
(2, 3, 2, 'Latin', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', NULL, '2024-12-03 19:32:33', '2024-12-03 19:32:33', 200, 20),
(3, 4, 3, 'Prognoza pogody', 'Pogoda jest dziś bardzo zadowalająca, idealna na spacer. Wybieram się z rodziną', NULL, '2024-12-04 11:35:50', '2024-12-04 13:15:28', 100, 10),
(7, 1, 2, 'Kotek', 'no kotek', 0xffd8ffe000104a46494600010101004800480000ffdb0043000a07070807060a0808080b0a0a0b0e18100e0d0d0e1d15161118231f2524221f2221262b372f26293429212230413134393b3e3e3e252e4449433c48373d3e3bffdb0043010a0b0b0e0d0e1c10101c3b2822283b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3bffc200110802bc04d803012200021101031101ffc4001a000003010101010000000000000000000001020300040506ffc4001801010101010100000000000000000000000001020304ffda000c03010002100310000001f0566718d1a25496ab6a, '2024-12-04 13:59:52', '2024-12-04 13:59:52', 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post_votes`
--

CREATE TABLE `post_votes` (
  `vote_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vote_type` varchar(10) DEFAULT NULL CHECK (`vote_type` in ('like','dislike')),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `reputation` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(25) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `profilePic` blob DEFAULT NULL,
  `background` tinyblob DEFAULT NULL,
  `profile_pic` tinyblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `reputation`, `created_at`, `role`, `description`, `profilePic`, `background`, `profile_pic`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin', 99, '2024-11-04 13:05:15', 'ADMIN', NULL, '', '', NULL),
(2, 'Janusz12', 'januszkowalski@wp.pl', 'janusz12', 0, '2024-11-04 13:06:25', 'MOD', NULL, '', '', NULL),
(3, 'tomaszus', 'tomaszka@mail.com', 'Kombajn12', 0, '2024-11-19 15:47:00', 'MOD', NULL, '', '', NULL),
(4, 'kacpersak', 'kacss@mail.com', 'Skoczek1', 0, '2024-11-19 16:15:24', 'USER', 'Lubie placki oraz naleśniki', '', 0x89504e470d0a1a0a0000000d49484452000000c8000000360803000000b51e26c50000000467414d410000b18f0bfc610500000300504c54452a2c2d323233524326453e2a292821584f333f3624423822463f2c534b32282927373121403928654a1a453d25342c1b4d3f243f39254237204e412939311c433c28393426302d254d46303a33203b331e453c264940264c422738301db58b3fb18839735727ba90437b5d29b69150c8a1528b6b34b79249a47c34a281459c7a40a98037a2782fc59c4d7f612c8769339e7d40ab8847a583477456208e6e3470521ca88241815f236c4e179e7c386e501b9371359b7533c1994c9e783b83632ba5803ea68240, 0x52494646a4a70100574542505650382098a70100f0a4089d012a400684033e6d3296482422a7a9a411fae9300d89656d38f6df8fedc67bfdba43ffe4965ffef5cdc3f97541c5865465a3fd3f05c563bdbe52f667fb2e4d5e55fade15c722ff5bbee3ae7fd1eaabce9ffb8e9b3e6e34a5ff8fd0bff39e96ffc465666a8e1bb95f3bff2fe6e7b93724f97df51f2dff8ff9cdff7f93bf1bff97ce03a87ff37f9cfcdef95fff8ff6efe07fec2ffd5fe83f7ffe877fa17f88fda9ff31f04fff7feda7c3afeedffa7d5eff65ff8ffb81ee91ff57f69fe00ff41ff63fb69fef3e433fa1ff82fff7ed97ff8bdaa3fc5ffddffffee57fb7fffe7ff5fb77fef4fc4dff6f),
(5, 'adas', 'add@mail.com', 'Kolega11', 0, '2024-11-20 16:10:47', 'USER', NULL, '', '', NULL),
(6, 'Baduser', 'baduss@gmail.com', 'Okropny1', 0, '2024-12-02 11:25:29', 'BLOCKED', NULL, '', '', NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `fk_comment_user_id` (`user_id`),
  ADD KEY `fk_post_id` (`post_id`);

--
-- Indeksy dla tabeli `comment_votes`
--
ALTER TABLE `comment_votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `fk_vote_comment_id` (`comment_id`),
  ADD KEY `fk_vote_comment_user_id` (`user_id`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `fk_post_user_id` (`user_id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indeksy dla tabeli `post_votes`
--
ALTER TABLE `post_votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `fk_vote_post_id` (`post_id`),
  ADD KEY `fk_vote_user_id` (`user_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `comment_votes`
--
ALTER TABLE `comment_votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `post_votes`
--
ALTER TABLE `post_votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

--
-- Ograniczenia dla tabeli `comment_votes`
--
ALTER TABLE `comment_votes`
  ADD CONSTRAINT `fk_vote_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`),
  ADD CONSTRAINT `fk_vote_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ograniczenia dla tabeli `post_votes`
--
ALTER TABLE `post_votes`
  ADD CONSTRAINT `fk_vote_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `fk_vote_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
