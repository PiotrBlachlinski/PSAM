package com.bd.forum.repositories;

import com.bd.forum.entities.Post;
import com.bd.forum.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    // Metody wyszukiwania specyficzne dla Post, jeśli potrzebne
    List<Post> findByUser(User user);
}
