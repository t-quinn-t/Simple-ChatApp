package com.server.controller;

import com.server.dao.MessageDao;
import com.server.dao.UserDao;
import com.server.model.Message;
import com.server.model.User;
import com.server.model_assembler.MessageModelAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author Qintu (Quinn) Tao
 * @date: 2021-08-02 11:57 a.m.
 */
@Controller
@RequestMapping("/chat")
public class MessageController {

    private final UserDao userDao;
    private final MessageDao messageDao;
    private final MessageModelAssembler messageModelAssembler;

    @Autowired
    public MessageController(UserDao userDao, MessageDao messageDao, MessageModelAssembler messageModelAssembler) {
        this.userDao = userDao;
        this.messageDao = messageDao;
        this.messageModelAssembler = messageModelAssembler;
    }

    @GetMapping("/send-message")
    @SendTo("/room/{roomId}")
    public EntityModel<Message> sendMessage(@RequestParam String message_content, @RequestParam Long userId,
                                            @RequestParam Long roomId) {
        User user = userDao.findByIdentifier(null, null, userId);
        // TODO: replace the roomId with actual roomId
        Message message = new Message(user.getUid(), 1L, message_content);
        return messageModelAssembler.toModel(message);
    }
}
