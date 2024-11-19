package com.bd.forum.controllers;

import com.bd.forum.entities.CommentVote;
import com.bd.forum.services.CommentVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comment-votes")
public class CommentVoteController {

    @Autowired
    private CommentVoteService commentVoteService;

    // Endpoint do pobierania wszystkich głosów na komentarze
    @GetMapping
    public List<CommentVote> getAllCommentVotes() {
        return commentVoteService.getAllCommentVotes();
    }

    // Endpoint do pobierania głosu na komentarz po ID
    @GetMapping("/{id}")
    public ResponseEntity<CommentVote> getCommentVoteById(@PathVariable int id) {
        Optional<CommentVote> commentVote = commentVoteService.getCommentVoteById(id);
        return commentVote.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint do tworzenia nowego głosu na komentarz
    @PostMapping
    public CommentVote createCommentVote(@RequestBody CommentVote commentVote) {
        return commentVoteService.saveCommentVote(commentVote);
    }

    // Endpoint do aktualizacji głosu na komentarz
    @PutMapping("/{id}")
    public ResponseEntity<CommentVote> updateCommentVote(@PathVariable int id, @RequestBody CommentVote commentVoteDetails) {
        Optional<CommentVote> existingVote = commentVoteService.getCommentVoteById(id);
        if (existingVote.isPresent()) {
            commentVoteDetails.setVoteId(id);
            CommentVote updatedVote = commentVoteService.updateCommentVote(commentVoteDetails);
            return ResponseEntity.ok(updatedVote);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint do usuwania głosu na komentarz po ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentVote(@PathVariable int id) {
        if (commentVoteService.getCommentVoteById(id).isPresent()) {
            commentVoteService.deleteCommentVoteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
