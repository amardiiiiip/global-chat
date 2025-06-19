
package chatapp.global_chat.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat/{language}")
    @SendTo("/topic/{language}")
    public ChatMessage sendMessage(@DestinationVariable String language, ChatMessage message) {
        return message;
    }
}

class ChatMessage {
    private String content;
    private String sender;

    public ChatMessage() {}

    public ChatMessage(String content, String sender) {
        this.content = content;
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}