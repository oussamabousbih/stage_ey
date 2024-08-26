package tn.esprit.stage_ey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.Entities.Cart;

import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart,Long> {



    Optional<Cart> findByUserId(Long id);
}
