package com.bd.forum.controllers;

import com.bd.forum.entities.User;
import com.bd.forum.services.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint do pobierania wszystkich użytkowników
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint do pobierania użytkownika po ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint do tworzenia nowego użytkownika
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Endpoint do aktualizacji użytkownika
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User userDetails) {
        Optional<User> existingUser = userService.getUserById(id);
        if (existingUser.isPresent()) {
            userDetails.setUserId(id);
            User updatedUser = userService.updateUser(userDetails);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint do usuwania użytkownika po ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        if (userService.getUserById(id).isPresent()) {
            userService.deleteUserById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");

        try {
            userService.registerUser(username, email, password);
            return ResponseEntity.ok("User registered successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> request, HttpSession session) {
        String email = request.get("email");
        String password = request.get("password");

        try {
            String response = userService.loginUser(email, password);

            // Dodanie użytkownika do sesji
            User user = userService.getUserByEmail(email);
            session.setAttribute("user", user); // Przechowuj obiekt User w sesji

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // Usunięcie sesji
        return ResponseEntity.ok("Logged out successfully.");
    }
}
