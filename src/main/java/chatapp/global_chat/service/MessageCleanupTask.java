package chatapp.global_chat.service;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import chatapp.global_chat.repository.ChatMessageRepository;

@Component
public class MessageCleanupTask {

    @Autowired
    private ChatMessageRepository repository;

    @Scheduled(fixedRate = 21600000) // Run every 6 hours
    public void deleteOldMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(6);
        repository.deleteMessagesOlderThan(cutoff);
    }
}