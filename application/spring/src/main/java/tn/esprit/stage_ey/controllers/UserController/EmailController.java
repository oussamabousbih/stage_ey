package tn.esprit.stage_ey.controllers.UserController;

import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.dto.loginRequest;
import tn.esprit.stage_ey.repository.AppUserRepository;
import tn.esprit.stage_ey.services.UserService.jwt.AppUserService;
import tn.esprit.stage_ey.services.UserService.jwt.EmailSender;
import tn.esprit.stage_ey.services.UserService.jwt.loaduser;
import tn.esprit.stage_ey.utilis.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailSender emailService;
    private final AppUserRepository appUserRepository;
    private  final JwtUtil jwtUtil;
    private final AppUserService appUserService;
    private final loaduser  loaduser;

    @GetMapping("/getconnecteduser")
    public Long getconnecteduser( Principal connectedUser) {
        return appUserService.getconnecteduser(connectedUser);
    }




    @PostMapping("/changePassword")
    public void changePassword(@RequestBody loginRequest request) {
        emailService.send(request.getEmail(), "Please verify your password change ----->  http://localhost:4200/changepass ");
    }


    @PostMapping("/password-reset-request")
    public void requestPasswordReset(@RequestBody loginRequest request) {
        // Check if the email exists in the database
        AppUser user = appUserRepository.findByEmail(request.getEmail()).get();
        if (user != null) {
            UserDetails userDetails;
            userDetails= loaduser.loadUserByUsername(user.getEmail());

            // Generate a unique reset token and associate it with the user
            String resetToken = jwtUtil.generateToken(userDetails.getUsername());

            // Send password reset email with the reset token
            emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
        }
        // Note: If the email doesn't exist, you may choose to show a generic message
    }
}
