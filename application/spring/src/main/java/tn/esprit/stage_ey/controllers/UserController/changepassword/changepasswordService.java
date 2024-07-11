package tn.esprit.stage_ey.controllers.UserController.changepassword;

import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class changepasswordService {
    private  final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    ////change password service
    /*public void changeCurrentPassword(ChangePasswordRequest request, Principal connectedUser) {
        // Get the email of the connected user
        String email = connectedUser.getName();

        // Retrieve the user from the repository based on the email
        Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);
        AppUser user = optionalUser.orElseThrow(() -> new IllegalStateException("User not found"));

        user.setPassword(request.getOldPassword());
        if(user.getPassword()==re)
        // Check if the new passwords match
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Passwords do not match");
        }

        // Update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // Save the updated user entity
        appUserRepository.save(user);
    }*/
        /*public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        // Get the email of the connected user
        String email = connectedUser.getName();

        // Retrieve the user from the repository based on the email
        Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);
        AppUser user = optionalUser.orElseThrow(() -> new IllegalStateException("User not found"));


        // Check if the new passwords match
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Passwords do not match");
        }

        // Update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // Save the updated user entity
        appUserRepository.save(user);
    }*/
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        // Get the email of the connected user
        String email = connectedUser.getName();

        // Retrieve the user from the repository based on the email
        Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);
        AppUser user = optionalUser.orElseThrow(() -> new IllegalStateException("User not found"));
        request.setNewPassword(request.getNewPassword());
        // Check for null password before encoding
        if (request.getNewPassword() == null) {
            throw new IllegalArgumentException("New password cannot be null");
        }

        // Check if the new passwords match
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Passwords do not match");
        }

        // Update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // Save the updated user entity
        appUserRepository.save(user);
    }



}
