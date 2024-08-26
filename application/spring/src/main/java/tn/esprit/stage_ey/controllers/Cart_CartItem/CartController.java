package tn.esprit.stage_ey.controllers.Cart_CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage_ey.Entities.Cart;
import tn.esprit.stage_ey.Entities.CartItem;
import tn.esprit.stage_ey.services.Cart_CartItem.ICartSevice;
import tn.esprit.stage_ey.services.Produit_Categorie.ICategoryService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private final ICartSevice cartService;



    @PostMapping("/add")
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = cartService.createCart(cart);
        return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
        Cart cart = cartService.getCartById(id);
        if (cart != null) {
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cart) {
        Cart updatedCart = cartService.updateCart(id, cart);
        if (updatedCart != null) {
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
