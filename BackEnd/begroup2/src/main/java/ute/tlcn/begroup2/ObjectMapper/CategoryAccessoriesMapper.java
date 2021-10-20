package ute.tlcn.begroup2.ObjectMapper;

import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.CategoryAccessoriesEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;

@Component
public class CategoryAccessoriesMapper {
    public CategoryAccessoriesModel convertCategoryAccessoriesEntityToCategoryAccessoriesModel(CategoryAccessoriesEntity categoryAccessoriesEntity){
        CategoryAccessoriesModel categoryAccessoriesModel = new CategoryAccessoriesModel(categoryAccessoriesEntity.getId(), 
        categoryAccessoriesEntity.getType(), 
        categoryAccessoriesEntity.getColor(), 
        categoryAccessoriesEntity.getBrand(), 
        categoryAccessoriesEntity.getOrigin(), 
        categoryAccessoriesEntity.getMaterial(), 
        categoryAccessoriesEntity.getProductId());

        return categoryAccessoriesModel;
    }

    public CategoryAccessoriesEntity convertCategoryAccessoriesModelToCategoryAccessoriesEntity(CategoryAccessoriesModel categoryAccessoriesModel){
        CategoryAccessoriesEntity categoryAccessoriesEntity = new CategoryAccessoriesEntity(categoryAccessoriesModel.getId(), 
        categoryAccessoriesModel.getType(), 
        categoryAccessoriesModel.getColor(), 
        categoryAccessoriesModel.getBrand(), 
        categoryAccessoriesModel.getOrigin(), 
        categoryAccessoriesModel.getMaterial(), 
        categoryAccessoriesModel.getProductId());

        return categoryAccessoriesEntity;
    }
}
