package tn.esprit.stage_ey.repository;


import tn.esprit.stage_ey.Entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser,Long> {


    boolean existsByEmail(String email);
    AppUser  findByid(Long id);
    Optional<AppUser>  findByEmail(String email);

    Optional<AppUser>  findByName(String name);


    List<AppUser> findAllByNameContainingIgnoreCase(String name);
}
