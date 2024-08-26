package tn.esprit.stage_ey.controllers.Produit_Category;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.stage_ey.Entities.ImageModel;
import tn.esprit.stage_ey.Entities.Product;
import tn.esprit.stage_ey.repository.ImageModelRepository;
import tn.esprit.stage_ey.services.Produit_Categorie.IProduitService;

import java.io.IOException;
import java.util.List;

import static tn.esprit.stage_ey.controllers.UserController.LoginController.compressBytes;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProduitController {

    private final IProduitService productService;
    private final ImageModelRepository imageModelRepository;
    @PostMapping("/add/{idcat}")
    public ResponseEntity<Product> createProduct(@RequestBody Product product,@PathVariable("idcat")  Long idCat) {
        return ResponseEntity.ok(productService.addProduct(product, idCat));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategoryId(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategoryId(categoryId));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
