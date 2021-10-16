package ute.tlcn.begroup2.Services.SellerServices;

import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;

public interface CategoryAccessoriesService {
    public CategoryAccessoriesModel createCategoryAccessories(CategoryAccessoriesModel categoryAccessoriesModel);
    public CategoryAccessoriesModel updateCategoryAccessories(int productId, CategoryAccessoriesModel categoryAccessoriesModel) throws Exception;
    public CategoryAccessoriesModel getCategoryAccessoriesByProductId(int productId) throws Exception;
}
