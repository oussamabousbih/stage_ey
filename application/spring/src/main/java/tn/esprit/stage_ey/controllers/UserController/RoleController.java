package tn.esprit.stage_ey.controllers.UserController;

import tn.esprit.stage_ey.Entities.Role;
import tn.esprit.stage_ey.services.UserService.jwt.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/roles/get")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(roleService.findAll());
    }

    @GetMapping("/role/get/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(roleService.findById(id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable("id") Long id) {
        if (roleService.deleteRole(id)) {
            return ResponseEntity.ok(ResponseEntity.ok("Role deleted successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addRole(@RequestBody Role role)
    {
        return ResponseEntity.ok(roleService.insert(role));
    }

}
