package com.bd.forum.repositories;

import com.bd.forum.entities.CommentVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentVoteRepository extends JpaRepository<CommentVote, Integer> {
    // Metody wyszukiwania specyficzne dla CommentVote, jeśli potrzebne
}
