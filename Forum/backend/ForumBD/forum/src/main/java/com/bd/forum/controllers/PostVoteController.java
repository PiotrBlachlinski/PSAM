package com.bd.forum.controllers;

import com.bd.forum.entities.PostVote;
import com.bd.forum.services.PostVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/post-votes")
public class PostVoteController {

    @Autowired
    private PostVoteService postVoteService;

    // Endpoint do pobierania wszystkich głosów na posty
    @GetMapping
    public List<PostVote> getAllPostVotes() {
        return postVoteService.getAllPostVotes();
    }

    // Endpoint do pobierania głosu na post po ID
    @GetMapping("/{id}")
    public ResponseEntity<PostVote> getPostVoteById(@PathVariable int id) {
        Optional<PostVote> postVote = postVoteService.getPostVoteById(id);
        return postVote.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint do tworzenia nowego głosu na post
    @PostMapping
    public PostVote createPostVote(@RequestBody PostVote postVote) {
        return postVoteService.savePostVote(postVote);
    }

    // Endpoint do aktualizacji głosu na post
    @PutMapping("/{id}")
    public ResponseEntity<PostVote> updatePostVote(@PathVariable int id, @RequestBody PostVote postVoteDetails) {
        Optional<PostVote> existingVote = postVoteService.getPostVoteById(id);
        if (existingVote.isPresent()) {
            postVoteDetails.setVoteId(id);
            PostVote updatedVote = postVoteService.updatePostVote(postVoteDetails);
            return ResponseEntity.ok(updatedVote);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint do usuwania głosu na post po ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostVote(@PathVariable int id) {
        if (postVoteService.getPostVoteById(id).isPresent()) {
            postVoteService.deletePostVoteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
