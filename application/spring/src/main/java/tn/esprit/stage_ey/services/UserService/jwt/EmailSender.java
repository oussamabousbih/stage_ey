package tn.esprit.stage_ey.services.UserService.jwt;


public interface EmailSender {
    void send(String to, String email);
    public void sendPasswordResetEmail(String userEmail, String resetToken);
}