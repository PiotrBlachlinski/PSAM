package com.bd.forum.repositories;

import com.bd.forum.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Metody wyszukiwania specyficzne dla Category, jeśli potrzebne
}
