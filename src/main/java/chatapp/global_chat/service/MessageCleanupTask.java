package chatapp.global_chat.service;


import chatapp.global_chat.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MessageCleanupTask {

    @Autowired
    private ChatMessageRepository repository;

    @Scheduled(fixedRate = 3600000) // Run every hour
    public void deleteOldMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(24);
        repository.deleteMessagesOlderThan(cutoff);
    }
}