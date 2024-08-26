package tn.esprit.stage_ey.services.Produit_Categorie;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage_ey.Entities.Category;
import tn.esprit.stage_ey.repository.CategoryRepo;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CatgeoryService implements ICategoryService {
    private final CategoryRepo categoryRepository;


    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category updateCategory(Long id, Category categoryDetails) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setName(categoryDetails.getName());
            return categoryRepository.save(category);
        } else {
            return null;
        }
    }

}
