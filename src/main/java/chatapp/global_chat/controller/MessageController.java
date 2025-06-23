package chatapp.global_chat.controller;

import chatapp.global_chat.model.ChatMessage;
import chatapp.global_chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/{language}")
    public List<ChatMessage> getMessages(@PathVariable String language) {
        return chatService.getMessagesByLanguage(language);
    }
}