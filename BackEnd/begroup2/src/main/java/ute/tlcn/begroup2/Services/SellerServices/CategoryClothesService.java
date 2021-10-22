package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;

import ute.tlcn.begroup2.Models.SellerModels.CategoryClothesModel;

public interface CategoryClothesService {
    public CategoryClothesModel createCategoryClothes(CategoryClothesModel categoryClothesModel);
    public CategoryClothesModel updateCategoryClothes(int productId, CategoryClothesModel categoryClothesModel) throws Exception;
    public CategoryClothesModel getCategoryClothesByProductId(int productId) throws Exception;
    public List<CategoryClothesModel> getCategoryClothesByType(String type);
}
