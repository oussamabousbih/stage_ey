package tn.esprit.stage_ey.services.Produit_Categorie;

import tn.esprit.stage_ey.Entities.Product;

import java.util.List;

public interface IProduitService {


     Product addProduct(Product produit,Long idCat);
     Product getProductById(Long id);
     List<Product> getAllProducts();
     void deleteProduct(Long id);
     List<Product> getProductsByCategoryId(Long categoryId);

     Product updateProduct(Long id, Product productDetails);

     void assignImageToProduct(Long imageId, Long productId);

}
