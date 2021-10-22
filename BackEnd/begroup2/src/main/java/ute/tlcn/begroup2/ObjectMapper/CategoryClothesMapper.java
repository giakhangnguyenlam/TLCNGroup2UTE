package ute.tlcn.begroup2.ObjectMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.CategoryClothesEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryClothesModel;

@Component
public class CategoryClothesMapper {
    public CategoryClothesModel convertCategoryClothesEntityToCategoryClothesModel(CategoryClothesEntity categoryClothesEntity){
        CategoryClothesModel categoryClothesModel = new CategoryClothesModel(categoryClothesEntity.getId(), 
        categoryClothesEntity.getType(), 
        categoryClothesEntity.getBrand(), 
        categoryClothesEntity.getOrigin(), 
        categoryClothesEntity.getSize(), 
        categoryClothesEntity.getColor(), 
        categoryClothesEntity.getMaterial(), 
        categoryClothesEntity.getGender(), 
        categoryClothesEntity.getProductId());

        return categoryClothesModel;
    }

    public CategoryClothesEntity convertCategoryClothesModelToCategoryClothesEntity(CategoryClothesModel categoryClothesModel){
        CategoryClothesEntity categoryClothesEntity = new CategoryClothesEntity(categoryClothesModel.getId(), 
        categoryClothesModel.getType(), 
        categoryClothesModel.getBrand(), 
        categoryClothesModel.getOrigin(), 
        categoryClothesModel.getSize(), 
        categoryClothesModel.getColor(), 
        categoryClothesModel.getMaterial(), 
        categoryClothesModel.getGender(), 
        categoryClothesModel.getProductId());

        return categoryClothesEntity;
    }

    public List<CategoryClothesModel> convertListClothesEntityToListCategoryClothesModel(List<CategoryClothesEntity> categoryClothesEntities){
        List<CategoryClothesModel> categoryClothesModels = categoryClothesEntities.stream()
        .map((categoryClothesEntity) -> {
            return convertCategoryClothesEntityToCategoryClothesModel(categoryClothesEntity);
        })
        .collect(Collectors.toList());

        return categoryClothesModels;
    }
}
