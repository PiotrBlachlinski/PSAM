package com.bd.forum.controllers;

import com.bd.forum.entities.User;
import com.bd.forum.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint do rejestracji
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.register(user);
            return ResponseEntity.ok("Rejestracja zakończona sukcesem.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Błąd rejestracji: " + e.getMessage());
        }
    }

    // Endpoint do logowania
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        if (userService.login(user.getUsername(), user.getPasswordHash())) {
            return ResponseEntity.ok("Logowanie zakończone sukcesem.");
        } else {
            return ResponseEntity.status(401).body("Nieprawidłowy login lub hasło.");
        }
    }

    // Endpoint do wylogowania
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        userService.logout();
        return ResponseEntity.ok("Wylogowano pomyślnie.");
    }

    // Endpoint do sprawdzania sesji
    @GetMapping("/session")
    public ResponseEntity<String> checkSession() {
        User currentUser = userService.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok("Zalogowany jako: " + currentUser.getUsername() + ", rola: " + currentUser.getRole());
        } else {
            return ResponseEntity.status(401).body("Brak aktywnej sesji.");
        }
    }
}
