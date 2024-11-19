package com.bd.forum.services;

import com.bd.forum.entities.PostVote;
import com.bd.forum.repositories.PostVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostVoteService {

    @Autowired
    private PostVoteRepository postVoteRepository;

    // Metoda do pobierania wszystkich głosów na posty
    public List<PostVote> getAllPostVotes() {
        return postVoteRepository.findAll();
    }

    // Metoda do pobierania głosu na post po ID
    public Optional<PostVote> getPostVoteById(int voteId) {
        return postVoteRepository.findById(voteId);
    }

    // Metoda do zapisywania nowego głosu na post
    public PostVote savePostVote(PostVote postVote) {
        return postVoteRepository.save(postVote);
    }

    // Metoda do aktualizacji głosu na post
    public PostVote updatePostVote(PostVote postVote) {
        return postVoteRepository.save(postVote);
    }

    // Metoda do usuwania głosu na post po ID
    public void deletePostVoteById(int voteId) {
        postVoteRepository.deleteById(voteId);
    }
}
