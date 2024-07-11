package tn.esprit.stage_ey.services.UserService.jwt;

import tn.esprit.stage_ey.Entities.Role;
import tn.esprit.stage_ey.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor//@RequiredArgsConstructor generates a constructor for the class that initializes all final fields. In this case, since there's only one final field (roleRepo), Lombok generates a constructor that accepts a parameter of type roleRepo and initializes the roleRepo field with it.
public class RoleService {


        private final RoleRepository roleRepo;//The final keyword means that once the roleRepo field is assigned a value, it cannot be changed. This field presumably represents a repository for user-related data access operations
        public List<Role>  findAll(){

            return roleRepo.findAll();
        }
        public Role findById(Long id){

            return roleRepo.findById(id).orElse(null);
        }
        public Role insert(Role entity){

            return roleRepo.save(entity);
        }
        public Role findByName(String name){

            return roleRepo.findByName(name);
        }


    public boolean deleteRole(Long id) {
        if (roleRepo.existsById(id)) {
            roleRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
    }


