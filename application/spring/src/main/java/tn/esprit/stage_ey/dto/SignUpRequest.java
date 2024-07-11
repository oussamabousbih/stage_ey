package tn.esprit.stage_ey.dto;

import tn.esprit.stage_ey.Entities.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class SignUpRequest {

    private  String email;
    private  String name;
    private  String password;
    private Set<Role> roles =new HashSet<>();

}
