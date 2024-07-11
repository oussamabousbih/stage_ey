package tn.esprit.stage_ey.controllers.UserController;

import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.repository.ImageModelRepository;
import tn.esprit.stage_ey.services.UserService.jwt.AppUserService;
import tn.esprit.stage_ey.services.UserService.jwt.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class AppUserController {
    private  final AppUserService appUserService;
    private final AuthService authService;
    private final ImageModelRepository imageRepository;


    @GetMapping("/get")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(appUserService.getallUsers());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(appUserService.findById(id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        if (appUserService.deleteUser(id)) {
            return ResponseEntity.ok(ResponseEntity.ok("User deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> UpdateUser(@RequestBody AppUser appUser){
        return ResponseEntity.ok(authService.updateeUser(appUser));
    }


    @PutMapping("/affecterimage/{id-img}/{id-user}")
    public void UpdateUser(@PathVariable("id-img") Long idi,@PathVariable("id-user") Long idu){
        appUserService.AffecterImageAuser(idi,idu);
    }
    @GetMapping("/searchUser/{name}")
    public List<AppUser> searchUser(@PathVariable  String name ){
        List<AppUser> a =appUserService.searchUser(name);
        return a;
    }

}
