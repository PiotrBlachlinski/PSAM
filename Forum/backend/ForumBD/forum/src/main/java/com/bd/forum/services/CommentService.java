package com.bd.forum.services;

import com.bd.forum.entities.Comment;
import com.bd.forum.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // Metoda do pobierania wszystkich komentarzy
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // Metoda do pobierania komentarza po ID
    public Optional<Comment> getCommentById(int commentId) {
        return commentRepository.findById(commentId);
    }

    // Metoda do zapisywania nowego komentarza
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Metoda do aktualizacji komentarza
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Metoda do usuwania komentarza po ID
    public void deleteCommentById(int commentId) {
        commentRepository.deleteById(commentId);
    }
}
