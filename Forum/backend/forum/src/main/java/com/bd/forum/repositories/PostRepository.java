package com.bd.forum.repositories;

import com.bd.forum.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    // Metody wyszukiwania specyficzne dla Post, jeśli potrzebne
}
