package com.bd.forum.services;

import com.bd.forum.entities.Category;
import com.bd.forum.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Metoda do pobierania wszystkich kategorii
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Metoda do pobierania kategorii po ID
    public Optional<Category> getCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId);
    }

    // Metoda do zapisywania nowej kategorii
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Metoda do aktualizacji kategorii
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Metoda do usuwania kategorii po ID
    public void deleteCategoryById(int categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
