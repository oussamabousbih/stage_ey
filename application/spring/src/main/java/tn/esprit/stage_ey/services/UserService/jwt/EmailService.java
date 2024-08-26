package tn.esprit.stage_ey.services.UserService.jwt;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import tn.esprit.stage_ey.Entities.CartItem;
import org.thymeleaf.context.Context;

import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService implements EmailSender {
    private final TemplateEngine templateEngine;
      private final static Logger LOGGER = LoggerFactory

              .getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    // Generate a unique token (UUID)
    String token = UUID.randomUUID().toString();
    @Override
    @Async
    public void send(String to, String email) {
        // Validate the email address format
        if (!isValidEmail(to)) {
            throw new IllegalArgumentException("Invalid email address: " + to);
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("Tunizon@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }

    // Validate email address format using regular expression
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    // Send password reset email
    public void sendPasswordResetEmail(String userEmail, String resetToken) {
        String resetLink =  "http://localhost:4200/changepass?token=" + resetToken;
        String emailContent = "Please reset your password by clicking on the following link: " + resetLink;

        // Send email to the user's email address
        send(userEmail, emailContent);
    }
    public void sendCartItemsEmail(String to, List<CartItem> cartItems, double totalPrice, String contactNumber) throws MessagingException {
        Context context = new Context();
        context.setVariable("cartItems", cartItems);
        context.setVariable("totalPrice", totalPrice);
        context.setVariable("contactNumber", contactNumber);

        String htmlContent = templateEngine.process("cartEmailTemplate", context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(to);
        helper.setSubject("Your Cart Items");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }
}

