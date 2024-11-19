package com.bd.forum.services;

import com.bd.forum.entities.User;
import com.bd.forum.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    private UserRepository userRepository;


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
    
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User registerUser(String username, String email, String password) {
        // Sprawdzenie czy użytkownik już istnieje
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already taken.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered.");
        }

        // Szyfrowanie hasła
        String encodedPassword = passwordEncoder.encode(password);

        // Tworzenie nowego użytkownika
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPasswordHash(encodedPassword);
        newUser.setReputation(0); // Domyślna wartość
        newUser.setCreatedAt(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    public String loginUser(String email, String password) {
        // Znajdź użytkownika po emailu
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        // Sprawdź poprawność hasła
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        // Wygeneruj prosty token (opcjonalnie)
        // W bardziej zaawansowanej wersji można użyć JWT
        return "Login successful for user: " + user.getUsername();
    }
}
