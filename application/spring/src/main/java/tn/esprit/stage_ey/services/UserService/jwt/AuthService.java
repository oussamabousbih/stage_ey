package tn.esprit.stage_ey.services.UserService.jwt;
import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.dto.SignUpRequest;

public interface AuthService {
    boolean createUser(SignUpRequest signUpRequest);
    boolean updateeUser(AppUser appUser);
}
