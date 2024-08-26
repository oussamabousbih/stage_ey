package tn.esprit.stage_ey.controllers.Cart_CartItem;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stage_ey.Entities.*;
import tn.esprit.stage_ey.dto.loginRequest;
import tn.esprit.stage_ey.repository.AppUserRepository;
import tn.esprit.stage_ey.repository.CartItemRepo;
import tn.esprit.stage_ey.repository.PurchaseOrdeRepo;
import tn.esprit.stage_ey.services.Cart_CartItem.ICartSevice;
import tn.esprit.stage_ey.services.Produit_Categorie.ICategoryService;
import tn.esprit.stage_ey.services.UserService.jwt.EmailSender;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/cartitem")
public class CartItemController {
    private final ICartSevice cartItemService;
    private final EmailSender emailSender;
    private final AppUserRepository userRepository;
    private final CartItemRepo cart;
    private final PurchaseOrdeRepo purchaseOrderRepository;

    @PostMapping("/add/{idprod}/{idcart}")
    public ResponseEntity<CartItem> createCartItem(@PathVariable("idprod") Long idproduit, @PathVariable("idcart") Long idcart, @RequestBody CartItem cartItem) {
        CartItem createdCartItem = cartItemService.createCartItem(idproduit, idcart, cartItem);
        return new ResponseEntity<>(createdCartItem, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        CartItem cartItem = cartItemService.getCartItemById(id);
        if (cartItem != null) {
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/cart/{idcart}")
    public ResponseEntity<List<CartItem>> getAllCartItems(@PathVariable ("idcart") Long idcart) {
        List<CartItem> cartItems = cartItemService.getAllCartItems(idcart);
        return new ResponseEntity<>(cartItems, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItem) {
        CartItem updatedCartItem = cartItemService.updateCartItem(id, cartItem);
        if (updatedCartItem != null) {
            return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/email")
    public void sendCartEmail( Principal connecteduser) throws MessagingException, MessagingException {
        String userEmail = connecteduser.getName();
        Optional<AppUser> user = userRepository.findByEmail(userEmail);
        List<CartItem> cartItems = cart.findAllByCarttId(user.get().getCart().getId());
        double totalPrice = cartItems.stream().mapToDouble(item -> item.getProductt().getPrice() * item.getQuantity()).sum();
        String contactNumber = "22444666";

        emailSender.sendCartItemsEmail(userEmail, cartItems, totalPrice, contactNumber);
        PurchaseOrder order = new PurchaseOrder();
        order.setOrderDate(new Date());
        AppUser u = userRepository.findByid(user.get().getId());
        order.setUsers(u);
        List<Product> products = cartItems.stream()
                .map(CartItem::getProductt)
                .collect(Collectors.toList());
        order.setProducts(products);
        order.setPrix(totalPrice);

        purchaseOrderRepository.save(order); // Save the order to the database
        cart.deleteAll(cartItems);

    }
    @GetMapping("/orders")
    public ResponseEntity<List<PurchaseOrder>> getAllOrders() {
        List<PurchaseOrder> orders = purchaseOrderRepository.findAll();
        return ResponseEntity.ok(orders);
    }
    @DeleteMapping("/orders/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") Long id) {
        purchaseOrderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
