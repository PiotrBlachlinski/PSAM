package com.bd.forum.repositories;

import com.bd.forum.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
    
    // Możemy dodać także metodę sprawdzającą, czy istnieje użytkownik o danej nazwie lub adresie e-mail
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
