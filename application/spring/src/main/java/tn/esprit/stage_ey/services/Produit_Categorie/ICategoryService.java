package tn.esprit.stage_ey.services.Produit_Categorie;

import tn.esprit.stage_ey.Entities.Category;

import java.util.List;

public interface ICategoryService {
    Category saveCategory(Category category);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
    void deleteCategory(Long id);
    Category updateCategory(Long id, Category categoryDetails);

}
