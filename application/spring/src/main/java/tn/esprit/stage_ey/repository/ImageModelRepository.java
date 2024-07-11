package tn.esprit.stage_ey.repository;

import tn.esprit.stage_ey.Entities.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageModelRepository extends JpaRepository<ImageModel, Long> {
    ImageModel findByName(String name);
    ImageModel findByid(Long Id);
}
