package chatapp.global_chat.controller;


import chatapp.global_chat.model.ChatMessage;
import chatapp.global_chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat/{language}")
    @SendTo("/topic/{language}")
    public ChatMessage sendMessage(@DestinationVariable String language, ChatMessage message) {
        chatService.saveMessage(message, language);
        return message;
    }
}