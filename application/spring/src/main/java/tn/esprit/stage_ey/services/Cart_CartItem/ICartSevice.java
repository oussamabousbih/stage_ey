package tn.esprit.stage_ey.services.Cart_CartItem;

import tn.esprit.stage_ey.Entities.Cart;
import tn.esprit.stage_ey.Entities.CartItem;

import java.util.List;

public interface ICartSevice {
    CartItem createCartItem(Long idproduit,Long idcart,CartItem cartItem);
    CartItem getCartItemById(Long id);
    List<CartItem> getAllCartItems(Long idcart);
    CartItem updateCartItem(Long id, CartItem cartItem);
    void deleteCartItem(Long id);


    Cart createCart(Cart cart);
    Cart getCartById(Long id);
    List<Cart> getAllCarts();
    Cart updateCart(Long id, Cart cart);
    void deleteCart(Long id);
}
