package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;

import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;

public interface CategoryAccessoriesService {
    public CategoryAccessoriesModel createCategoryAccessories(CategoryAccessoriesModel categoryAccessoriesModel);
    public CategoryAccessoriesModel updateCategoryAccessories(int productId, CategoryAccessoriesModel categoryAccessoriesModel) throws Exception;
    public CategoryAccessoriesModel getCategoryAccessoriesByProductId(int productId) throws Exception;
    public List<ProductModel> getCategoryAccessoriesByType(String type);
}
