package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;

import ute.tlcn.begroup2.Models.SellerModels.CategoryShoesModel;

public interface CategoryShoesService {
    public CategoryShoesModel createCategoryShoes(CategoryShoesModel categoryShoesModel);
    public CategoryShoesModel updateCategoryShoes(int productId, CategoryShoesModel categoryShoesModel) throws Exception;
    public CategoryShoesModel getCategoryShoesByProductId(int productId) throws Exception;
    public List<CategoryShoesModel> getCategoryShoesByStyle(String style);
}
