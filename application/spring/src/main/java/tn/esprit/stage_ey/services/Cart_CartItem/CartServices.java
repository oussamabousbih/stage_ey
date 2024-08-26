package tn.esprit.stage_ey.services.Cart_CartItem;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage_ey.Entities.*;
import tn.esprit.stage_ey.repository.*;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServices implements ICartSevice {

    private final CartItemRepo cartItemRepository;
    private final ProductRepo productRepo;
    private final CartRepo cartRepository;
    @Override
    public CartItem createCartItem(Long idproduit, Long idcart, CartItem cartItem) {
        Product product = productRepo.findById(idproduit).orElseThrow(() -> new RuntimeException("Product not found"));
        Cart cart = cartRepository.findById(idcart).orElseThrow(() -> new RuntimeException("Cart not found"));

        cartItem.setProductt(product);
        cartItem.setCartt(cart);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem getCartItemById(Long id) {
        Optional<CartItem> cartItem = cartItemRepository.findById(id);
        return cartItem.orElse(null);
    }

    @Override
    public List<CartItem> getAllCartItems(Long idcart) {
        return
                cartItemRepository.findAllByCarttId(idcart);
    }

    @Override
    public CartItem updateCartItem(Long id, CartItem cartItemDetails) {
        CartItem existingCartItem = cartItemRepository.findById(id).get();

        existingCartItem.setQuantity(cartItemDetails.getQuantity());

        // Fetch the existing cart from the database to ensure it is fully populated
        Cart existingCart = cartRepository.findById(existingCartItem.getCartt().getId()).get();
        existingCartItem.setCartt(existingCart);

        return cartItemRepository.save(existingCartItem);
    }

    @Override
    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    @Override
    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartById(Long id) {
        Optional<Cart> cart = cartRepository.findByUserId(id);
        return cart.orElse(null);
    }

    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Override
    public Cart updateCart(Long id, Cart cart) {
        if (cartRepository.existsById(id)) {
            cart.setId(id);
            return cartRepository.save(cart);
        }
        return null;
    }

    @Override
    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

}
