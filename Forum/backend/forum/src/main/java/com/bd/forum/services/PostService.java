package com.bd.forum.services;

import com.bd.forum.entities.Post;
import com.bd.forum.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Metoda do pobierania wszystkich postów
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Metoda do pobierania postu po ID
    public Optional<Post> getPostById(int postId) {
        return postRepository.findById(postId);
    }

    // Metoda do zapisywania nowego postu
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    // Metoda do aktualizacji postu
    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    // Metoda do usuwania postu po ID
    public void deletePostById(int postId) {
        postRepository.deleteById(postId);
    }
}
