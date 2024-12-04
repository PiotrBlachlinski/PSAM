package com.bd.forum.controllers;

import com.bd.forum.entities.Post;
import com.bd.forum.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Endpoint to get all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Endpoint to get a post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to create a new post
    @PostMapping
    public Post createPost(
            @RequestParam("userId") int userId,
            @RequestParam("categoryId") int categoryId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        return postService.savePost(userId, categoryId, title, content, image);
    }

    // Endpoint to update a post
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable int id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Optional<Post> existingPost = postService.getPostById(id);
        if (existingPost.isPresent()) {
            Post updatedPost = postService.updatePost(existingPost.get(), title, content, image);
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable int id) {
        if (postService.getPostById(id).isPresent()) {
            postService.deletePostById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{postId}/image")
    public ResponseEntity<byte[]> getPostImage(@PathVariable int postId) {
        Optional<Post> post = postService.getPostById(postId);
        if (post.isPresent() && post.get().getImage() != null) {
            byte[] image = post.get().getImage();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
