package com.bd.forum.services;

import com.bd.forum.entities.Post;
import com.bd.forum.repositories.PostRepository;
import com.bd.forum.entities.Category;
import com.bd.forum.entities.User;
import com.bd.forum.repositories.CategoryRepository;
import com.bd.forum.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Method to get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Method to get a post by ID
    public Optional<Post> getPostById(int postId) {
        return postRepository.findById(postId);
    }

    // Method to save a new post
    public Post savePost(int userId, int categoryId, String content, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        Post newPost = new Post();
        newPost.setUser(user);
        newPost.setCategory(category);
        newPost.setContent(content);
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setUpdatedAt(LocalDateTime.now());
        if (image != null && !image.isEmpty()) {
            newPost.setImage(image.getBytes());
        }
        return postRepository.save(newPost);
    }

    // Method to update a post
    public Post updatePost(Post post, String content, MultipartFile image) throws IOException {
        post.setContent(content);
        post.setUpdatedAt(LocalDateTime.now());
        if (image != null && !image.isEmpty()) {
            post.setImage(image.getBytes());
        }
        return postRepository.save(post);
    }

    // Method to delete a post by ID
    public void deletePostById(int postId) {
        postRepository.deleteById(postId);
    }
}
