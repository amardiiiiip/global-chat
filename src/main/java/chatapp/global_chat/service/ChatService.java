package chatapp.global_chat.service;


import chatapp.global_chat.model.ChatMessage;
import chatapp.global_chat.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository repository;

    public void saveMessage(ChatMessage message, String language) {
        ChatMessage dbMessage = new ChatMessage(
            message.getContent(),
            message.getSender(),
            language,
            LocalDateTime.now()
        );
        repository.save(dbMessage);
    }

    public List<ChatMessage> getMessagesByLanguage(String language) {
        return repository.findByLanguage(language);
    }
}