package com.bd.forum.services;

import com.bd.forum.entities.User;
import com.bd.forum.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
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
    

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String username, String email, String password) {
        // Sprawdzenie czy użytkownik już istnieje
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already taken.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered.");
        }

        // Zapisz hasło bez szyfrowania
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPasswordHash(password); 
        newUser.setRole("USER");
        newUser.setReputation(0);
        newUser.setCreatedAt(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
    
        // Porównaj hasło bez szyfrowania
        if (!password.equals(user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }
    
        return "Login successful for user: " + user.getUsername();
    }

    public void updateUserProfile(User user, String username, String description, MultipartFile profilePic, MultipartFile background) throws IOException {
        user.setUsername(username);
        user.setDescription(description);
        if (profilePic != null && !profilePic.isEmpty()) {
            user.setProfilePic(profilePic.getBytes());
        }
        if (background != null && !background.isEmpty()) {
            user.setBackground(background.getBytes());
        }
        userRepository.save(user);
    }
}
