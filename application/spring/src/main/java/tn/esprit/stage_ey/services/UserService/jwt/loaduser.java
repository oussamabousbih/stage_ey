package tn.esprit.stage_ey.services.UserService.jwt;

import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.Entities.Role;
import tn.esprit.stage_ey.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class loaduser  implements UserDetailsService {
    private  final AppUserRepository appUserRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {//login

        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow (()-> new UsernameNotFoundException("appUser not found with email " + email));

        // Get roles associated with the user
        Set<Role> roles = appUser.getRoles();

        // Create a collection of GrantedAuthority objects based on the user's roles
        Collection<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());
        return  new User(appUser.getEmail(), appUser.getPassword(), authorities);
    }

}
