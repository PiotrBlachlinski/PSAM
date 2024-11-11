package com.bd.forum.repositories;

import com.bd.forum.entities.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Integer> {
    // Metody wyszukiwania specyficzne dla Thread, jeśli potrzebne
}
