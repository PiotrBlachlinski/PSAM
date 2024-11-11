package com.bd.forum.services;

import com.bd.forum.entities.CommentVote;
import com.bd.forum.repositories.CommentVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentVoteService {

    @Autowired
    private CommentVoteRepository commentVoteRepository;

    // Metoda do pobierania wszystkich głosów na komentarze
    public List<CommentVote> getAllCommentVotes() {
        return commentVoteRepository.findAll();
    }

    // Metoda do pobierania głosu po ID
    public Optional<CommentVote> getCommentVoteById(int voteId) {
        return commentVoteRepository.findById(voteId);
    }

    // Metoda do zapisywania nowego głosu
    public CommentVote saveCommentVote(CommentVote commentVote) {
        return commentVoteRepository.save(commentVote);
    }

    // Metoda do aktualizacji głosu
    public CommentVote updateCommentVote(CommentVote commentVote) {
        return commentVoteRepository.save(commentVote);
    }

    // Metoda do usuwania głosu po ID
    public void deleteCommentVoteById(int voteId) {
        commentVoteRepository.deleteById(voteId);
    }
}
