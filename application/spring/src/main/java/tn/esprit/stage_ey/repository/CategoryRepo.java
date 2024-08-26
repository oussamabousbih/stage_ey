package tn.esprit.stage_ey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.stage_ey.Entities.Category;

public interface CategoryRepo extends JpaRepository<Category,Long> {
}
