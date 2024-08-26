package tn.esprit.stage_ey.services.UserService.jwt;


import jakarta.annotation.PostConstruct;
import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.Entities.Cart;
import tn.esprit.stage_ey.Entities.Role;
import tn.esprit.stage_ey.dto.SignUpRequest;
import tn.esprit.stage_ey.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.stage_ey.repository.CartRepo;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthentificationService implements  AuthService {

   private  final AppUserRepository appUserRepository;

   private  final PasswordEncoder passwordEncoder;
   private final RoleService roleService;
   private final CartRepo cartRepo;



    @Override
    public boolean createUser(SignUpRequest signUpRequest) {

       if(appUserRepository.existsByEmail(signUpRequest.getEmail())){

           return  false;

       }
        AppUser a = new AppUser();
        Cart c = new Cart();
        BeanUtils.copyProperties(signUpRequest, a);

       String HashPassword= passwordEncoder.encode(signUpRequest.getPassword());
       a.setPassword(HashPassword);






        // Define the allowed roles
        Set<String> allowedRoles = Set.of("admin", "user");

        // Check if provided roles are allowed
        for (Role role : a.getRoles()) {
            if (!allowedRoles.contains(role.getName())) {
                return  false;
            }
        }
        // ajout de la liste des roles in the data base
        for (String roleName : allowedRoles) {
            Role existingRole = roleService.findByName(roleName);
            if (existingRole == null) {
                existingRole = new Role(null, roleName);
                existingRole = roleService.insert(existingRole);
            }
        }
        // Add the user
        Set<Role> rolesToAdd = new HashSet<>();
        for (Role role : a.getRoles()) {
            Role existingRole = roleService.findByName(role.getName());
            rolesToAdd.add(existingRole);
        }




        c.setUser(a);

        a.setRoles(rolesToAdd);
       appUserRepository.save(a);
        cartRepo.save(c);
       return  true;
    }

    @Override
    public boolean updateeUser(AppUser a) {
        if(!appUserRepository.existsById(a.getId())){

            return  false;

        }
        String HashPassword= passwordEncoder.encode(a.getPassword());
        a.setPassword(HashPassword);

        // Define the allowed roles
        Set<String> allowedRoles = Set.of("admin", "user");

        // Check if provided roles are allowed
        for (Role role : a.getRoles()) {
            if (!allowedRoles.contains(role.getName())) {
                return  false;
            }
        }
        // Ensure that the allowed roles exist in the database
        for (String roleName : allowedRoles) {
            Role existingRole = roleService.findByName(roleName);
            if (existingRole == null) {
                existingRole = new Role(null, roleName);
                existingRole = roleService.insert(existingRole);
            }
        }
        // Add the user
        Set<Role> rolesToAdd = new HashSet<>();
        for (Role role : a.getRoles()) {
            Role existingRole = roleService.findByName(role.getName());
            rolesToAdd.add(existingRole);
        }
        a.setRoles(rolesToAdd);
        appUserRepository.save(a);
        return  true;
    }
}
