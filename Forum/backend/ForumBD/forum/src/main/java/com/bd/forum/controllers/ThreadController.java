package com.bd.forum.controllers;

import com.bd.forum.entities.Thread;
import com.bd.forum.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/threads")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    // Endpoint do pobierania wszystkich wątków
    @GetMapping
    public List<Thread> getAllThreads() {
        return threadService.getAllThreads();
    }

    // Endpoint do pobierania wątku po ID
    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById(@PathVariable int id) {
        Optional<Thread> thread = threadService.getThreadById(id);
        return thread.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint do tworzenia nowego wątku
    @PostMapping
    public Thread createThread(@RequestBody Thread thread) {
        return threadService.saveThread(thread);
    }

    // Endpoint do aktualizacji wątku
    @PutMapping("/{id}")
    public ResponseEntity<Thread> updateThread(@PathVariable int id, @RequestBody Thread threadDetails) {
        Optional<Thread> existingThread = threadService.getThreadById(id);
        if (existingThread.isPresent()) {
            threadDetails.setThreadId(id);
            Thread updatedThread = threadService.updateThread(threadDetails);
            return ResponseEntity.ok(updatedThread);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint do usuwania wątku po ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThread(@PathVariable int id) {
        if (threadService.getThreadById(id).isPresent()) {
            threadService.deleteThreadById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
