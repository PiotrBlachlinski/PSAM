package com.bd.forum.repositories;

import com.bd.forum.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // Metody wyszukiwania specyficzne dla Comment, jeśli potrzebne
}
