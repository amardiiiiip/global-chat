package chatapp.global_chat.repository;


import chatapp.global_chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByLanguage(String language);

    @Modifying
    @Transactional
    @Query("DELETE FROM ChatMessage m WHERE m.timestamp < :cutoff")
    void deleteMessagesOlderThan(LocalDateTime cutoff);
}