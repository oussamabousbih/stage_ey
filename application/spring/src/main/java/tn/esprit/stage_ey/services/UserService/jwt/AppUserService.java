package tn.esprit.stage_ey.services.UserService.jwt;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import tn.esprit.stage_ey.Entities.*;
import tn.esprit.stage_ey.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@RequiredArgsConstructor
@Slf4j
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final ImageModelRepository imageModelRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;



    @PostConstruct
    public void createAdminAccount() {
        Optional<AppUser> opUser = appUserRepository.findByName("admin");

        if (opUser.isEmpty()) {
            AppUser user = new AppUser();
            user.setEmail("admin@test.com");
            user.setName("admin");
            user.setPassword(passwordEncoder.encode("admin"));

                Role role=new Role();
                role.setName("admin");
                roleRepository.save(role);



            Set<Role> roles = new HashSet<>();
            roles.add(role);
            user.setRoles(roles);
            appUserRepository.save(user);

            System.out.println("Admin account created successfully!!");
        } else {
            System.out.println("Admin account already exists!!");
        }
    }


    private static final String USER_IMAGE_DIR = "src/images/";

    public List<AppUser> searchUser(String name ){
        List<AppUser> a =appUserRepository.findAllByNameContainingIgnoreCase(name);
        return a;
    }

    public List<AppUser> getallUsers(){
        return appUserRepository.findAll();
    }

    public AppUser findById(Long id){
        return appUserRepository.findById(id).orElse(null);
    }

    public boolean deleteUser (Long id) {
        if (appUserRepository.existsById(id)) {
            appUserRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }


    public Long getconnecteduser( Principal connectedUser) {
        // Get the email of the connected user
        String email = connectedUser.getName();

        // Retrieve the user from the repository based on the email
        Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);
        AppUser user = optionalUser.orElseThrow(() -> new IllegalStateException("User not found"));
        return  user.getId();
    }


    public void AffecterImageAuser(Long idimage,Long iduser){
        ImageModel img=imageModelRepository.findByid(idimage);
        AppUser user=appUserRepository.findByid(iduser);

        user.setImage(img);
        appUserRepository.save(user);


    }


   /* public void affectercourseauser(Long  courseId ,Long userID){
     Course c =courseRepository.findById(courseId).get();
        AppUser user =appUserRepository.findById(userID).get();
        user.getCourses().add(c);
        appUserRepository.save(user);

    }*/

  /*  public void affecterProjetcTouser(Projet projet, Long userID){

        //get connected user =
//        if(user != null && projet != null)
//            projet.setUser(user);
//        else
//            System.out.println("operaton ad user to projec fails");
    }*/



 /*   public void affecterErreurauser(Long errID, Long userID){

        AppUser user =appUserRepository.findById(userID).get();
        Error e=errorRepository.findById(errID).get();
        user.getErrors().add(e);
        e.setErrorowner(user);
        appUserRepository.save(user);
        errorRepository.save(e) ;

    }*/

  /*  public void affecterCommentauser(Long comID, Long userID){

        AppUser user =appUserRepository.findById(userID).get();
        Comment c=commentRepository.findById(comID).get();
        user.getComments().add(c);
        c.setCommentowner(user);
        appUserRepository.save(user);
        commentRepository.save(c) ;

    }*/

}

