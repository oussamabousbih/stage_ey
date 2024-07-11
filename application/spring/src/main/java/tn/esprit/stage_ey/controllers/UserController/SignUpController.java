package tn.esprit.stage_ey.controllers.UserController;


import tn.esprit.stage_ey.dto.SignUpRequest;
import tn.esprit.stage_ey.services.UserService.jwt.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class SignUpController {

    private  final AuthService authService;


    @PostMapping("/signup")

    public ResponseEntity<String> SignUpCustomer(@RequestBody SignUpRequest signUpRequest){


        boolean isUserCreated = authService.createUser(signUpRequest);
        if(isUserCreated){
            return  ResponseEntity.status(HttpStatus.CREATED).body("Custommer Created Succefuly");
        }
        else {

            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to created Custommer");
        }
    }


}
