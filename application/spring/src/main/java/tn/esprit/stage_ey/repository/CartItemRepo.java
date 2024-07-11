package tn.esprit.stage_ey.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.esprit.stage_ey.Entities.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem,Long> {
}
