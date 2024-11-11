package com.bd.forum.repositories;

import com.bd.forum.entities.PostVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostVoteRepository extends JpaRepository<PostVote, Integer> {
    // Metody wyszukiwania specyficzne dla PostVote, jeśli potrzebne
}
