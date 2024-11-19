package com.bd.forum.services;

import com.bd.forum.entities.Thread;
import com.bd.forum.repositories.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    // Metoda do pobierania wszystkich wątków
    public List<Thread> getAllThreads() {
        return threadRepository.findAll();
    }

    // Metoda do pobierania wątku po ID
    public Optional<Thread> getThreadById(int threadId) {
        return threadRepository.findById(threadId);
    }

    // Metoda do zapisywania nowego wątku
    public Thread saveThread(Thread thread) {
        return threadRepository.save(thread);
    }

    // Metoda do aktualizacji wątku
    public Thread updateThread(Thread thread) {
        return threadRepository.save(thread);
    }

    // Metoda do usuwania wątku po ID
    public void deleteThreadById(int threadId) {
        threadRepository.deleteById(threadId);
    }
}
