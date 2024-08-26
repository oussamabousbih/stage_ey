package tn.esprit.stage_ey.services.Produit_Categorie;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage_ey.Entities.Category;
import tn.esprit.stage_ey.Entities.ImageModel;
import tn.esprit.stage_ey.Entities.Product;
import tn.esprit.stage_ey.repository.CategoryRepo;
import tn.esprit.stage_ey.repository.ImageModelRepository;
import tn.esprit.stage_ey.repository.ProductRepo;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProduitService implements IProduitService {

    private final ProductRepo productRepository;
    private final ImageModelRepository imageModelRepository;
    private final CategoryRepo categoryRepo;
    @Override
    public Product addProduct(Product product, Long idCat) {
        Optional<Category> optionalCategory = categoryRepo.findById(idCat);

        if (optionalCategory.isPresent()) {
            Category cat = optionalCategory.get();
            product.setCategory(cat);
            return productRepository.save(product);
        } else {
            throw new EntityNotFoundException("Category not found with id " + idCat);
        }
    }


    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    @Override
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getName());
            product.setPrice(productDetails.getPrice());
            product.setCategory(productDetails.getCategory());
            product.setImage(productDetails.getImage());
            return productRepository.save(product);
        } else {
            return null;
        }
    }
    @Override
    public void assignImageToProduct(Long imageId, Long productId) {
        ImageModel image = imageModelRepository.findById(imageId).orElseThrow(() -> new RuntimeException("Image not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setImage(image);
        productRepository.save(product);
    }
}
