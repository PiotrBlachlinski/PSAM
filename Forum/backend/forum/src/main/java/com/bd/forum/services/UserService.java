package com.bd.forum.services;

import com.bd.forum.entities.User;
import com.bd.forum.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private User currentUser;

    // Metoda do pobierania wszystkich użytkowników
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Metoda do pobierania użytkownika po ID
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    // Metoda do zapisywania nowego użytkownika
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Metoda do aktualizacji użytkownika
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Metoda do usuwania użytkownika po ID
    public void deleteUserById(int userId) {
        userRepository.deleteById(userId);
    }

    // Rejestracja nowego użytkownika bez hashowania hasła
    public void register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Nazwa użytkownika jest już zajęta.");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Adres e-mail jest już zajęty.");
        }
        user.setRole("USER"); // Domyślna rola dla nowych użytkowników
        userRepository.save(user);
    }

    // Logowanie użytkownika bez hashowania
    public boolean login(String username, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPasswordHash().equals(rawPassword)) {
                currentUser = user; // Ustawienie aktywnego użytkownika
                return true;
            }
        }
        return false;
    }

    // Wylogowanie użytkownika
    public void logout() {
        currentUser = null; // Wyczyszczenie aktywnego użytkownika
    }

    // Pobranie aktualnie zalogowanego użytkownika
    public User getCurrentUser() {
        return currentUser;
    }
}
