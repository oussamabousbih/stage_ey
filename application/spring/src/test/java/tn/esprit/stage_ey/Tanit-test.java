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
    private ProductRepo productRepo;

    @Mock
    private CategoryRepo categoryRepo;

    @Mock
    private ImageModelRepository imageModelRepository;

    @InjectMocks
    private ProductService productService;  // Ensure this matches your service class name

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
    void shouldAddProductWhenCategoryExists() {
        when(categoryRepo.findById(1L)).thenReturn(Optional.of(category));
        when(productRepo.save(any(Product.class))).thenReturn(productA);

        Product result = productService.addProduct(productA, 1L);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        verify(categoryRepo, times(1)).findById(1L);
        verify(productRepo, times(1)).save(productA);
    }

    @Test
    void shouldGetProductByIdWhenExists() {
        when(productRepo.findById(1L)).thenReturn(Optional.of(productA));

        Product result = productService.getProductById(1L);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
        verify(productRepo, times(1)).findById(1L);
    }

    @Test
    void shouldGetAllProducts() {
        when(productRepo.findAll()).thenReturn(Arrays.asList(productA, productB));

        List<Product> result = productService.getAllProducts();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(productRepo, times(1)).findAll();
    }

    @Test
    void shouldDeleteProductWhenExists() {
        doNothing().when(productRepo).deleteById(1L);

        productService.deleteProduct(1L);

        verify(productRepo, times(1)).deleteById(1L);
    }

    @Test
    void shouldGetProductsByCategoryIdWhenCategoryExists() {
        when(categoryRepo.findById(1L)).thenReturn(Optional.of(category));
        when(productRepo.findByCategoryId(1L)).thenReturn(Arrays.asList(productA, productB));

        List<Product> result = productService.getProductsByCategoryId(1L);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(categoryRepo, times(1)).findById(1L);
        verify(productRepo, times(1)).findByCategoryId(1L);
    }

    @Test
    void shouldUpdateProductWhenExists() {
        Product updatedDetails = new Product();
        updatedDetails.setName("Updated Laptop");
        updatedDetails.setPrice(1300.0);

        when(productRepo.findById(1L)).thenReturn(Optional.of(productA));
        when(productRepo.save(any(Product.class))).thenReturn(updatedDetails);

        Product result = productService.updateProduct(1L, updatedDetails);

        assertNotNull(result);
        assertEquals("Updated Laptop", result.getName());
        verify(productRepo, times(1)).findById(1L);
        verify(productRepo, times(1)).save(updatedDetails);  // Corrected to updatedDetails
    }

    @Test
    void shouldAssignImageToProductWhenProductAndImageExist() {
        when(productRepo.findById(1L)).thenReturn(Optional.of(productA));
        when(imageModelRepository.findById(1L)).thenReturn(Optional.of(imageModel));
        when(productRepo.save(any(Product.class))).thenReturn(productA);

        productService.assignImageToProduct(1L, 1L);

        assertNotNull(productA.getImage());
        assertEquals("image.jpg", productA.getImage().getName());
        verify(productRepo, times(1)).findById(1L);
        verify(imageModelRepository, times(1)).findById(1L);
        verify(productRepo, times(1)).save(productA);
    }
}
