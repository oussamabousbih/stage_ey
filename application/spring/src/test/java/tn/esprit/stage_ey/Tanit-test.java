package tn.esprit.stage_ey;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ImageModelRepository imageModelRepository;

    @InjectMocks
    private ProductService productService;

    private Product productA;
    private Product productB;
    private Category category;
    private ImageModel imageModel;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Electronics");

        imageModel = new ImageModel();
        imageModel.setId(1L);
        imageModel.setName("image.jpg");

        productA = new Product();
        productA.setId(1L);
        productA.setName("Laptop");
        productA.setPrice(1200.0);
        productA.setDescription("High-performance laptop");
        productA.setCategory(category);
        productA.setImage(imageModel);

        productB = new Product();
        productB.setId(2L);
        productB.setName("Phone");
        productB.setPrice(800.0);
        productB.setDescription("Latest smartphone");
        productB.setCategory(category);
    }

    @Test
    void testAddProduct() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(productRepository.save(any(Product.class))).thenReturn(productA);

        Product result = productService.addProduct(productA, 1L);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        verify(categoryRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(productA);
    }

    @Test
    void testGetProductById() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(productA));

        Product result = productService.getProductById(1L);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(Arrays.asList(productA, productB));

        List<Product> result = productService.getAllProducts();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productRepository).deleteById(1L);

        productService.deleteProduct(1L);

        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetProductsByCategoryId() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(productRepository.findByCategoryId(1L)).thenReturn(Arrays.asList(productA, productB));

        List<Product> result = productService.getProductsByCategoryId(1L);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(categoryRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).findByCategoryId(1L);
    }

    @Test
    void testUpdateProduct() {
        Product updatedDetails = new Product();
        updatedDetails.setName("Updated Laptop");
        updatedDetails.setPrice(1300.0);

        when(productRepository.findById(1L)).thenReturn(Optional.of(productA));
        when(productRepository.save(any(Product.class))).thenReturn(updatedDetails);

        Product result = productService.updateProduct(1L, updatedDetails);

        assertNotNull(result);
        assertEquals("Updated Laptop", result.getName());
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(productA);
    }

    @Test
    void testAssignImageToProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(productA));
        when(imageModelRepository.findById(1L)).thenReturn(Optional.of(imageModel));
        when(productRepository.save(any(Product.class))).thenReturn(productA);

        productService.assignImageToProduct(1L, 1L);

        assertNotNull(productA.getImage());
        assertEquals("image.jpg", productA.getImage().getName());
        verify(productRepository, times(1)).findById(1L);
        verify(imageModelRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(productA);
    }
}
