package tn.esprit.stage_ey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage_ey.Entities.AppUser;
import tn.esprit.stage_ey.Entities.Product;

public interface ProductRepo extends JpaRepository<Product,Long> {
}
