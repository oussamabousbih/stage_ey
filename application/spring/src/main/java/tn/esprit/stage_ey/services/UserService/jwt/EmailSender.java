package tn.esprit.stage_ey.services.UserService.jwt;


import jakarta.mail.MessagingException;
import tn.esprit.stage_ey.Entities.CartItem;

import java.util.List;

public interface EmailSender {
    void send(String to, String email);
    public void sendPasswordResetEmail(String userEmail, String resetToken);
    public void sendCartItemsEmail(String to, List<CartItem> cartItems, double totalPrice, String contactNumber)  throws MessagingException ;

    }