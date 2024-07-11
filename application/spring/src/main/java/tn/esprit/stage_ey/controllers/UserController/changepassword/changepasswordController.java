package tn.esprit.stage_ey.controllers.UserController.changepassword;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
@RestController
@RequestMapping("/change")
@RequiredArgsConstructor
@CrossOrigin("*")
public class changepasswordController {
    private final changepasswordService service;
    @PatchMapping("/pass")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connnecteduser) {
        service.changePassword(request, connnecteduser);
        return ResponseEntity.ok().build();

    }

   /* @PutMapping("/change-current-pass")
    public void changeCurrentPassword(@RequestBody ChangePasswordRequest request, Principal connnecteduser) {
        service.changeCurrentPassword(request, connnecteduser);

    }*/


}