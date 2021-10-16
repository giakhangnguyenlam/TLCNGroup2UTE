package ute.tlcn.begroup2.ObjectMapper;

import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.CategoryShoesEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryShoesModel;

@Component
public class CategoryShoesMapper {
    public CategoryShoesModel  convertCategoryShoesEntityToCategoryShoesModel(CategoryShoesEntity categoryShoesEntity){
        CategoryShoesModel categoryShoesModel = new CategoryShoesModel(categoryShoesEntity.getId(), 
        categoryShoesEntity.getStyle(), 
        categoryShoesEntity.getSize(), 
        categoryShoesEntity.getColor() ,
        categoryShoesEntity.getHeight(), 
        categoryShoesEntity.getWeight(), 
        categoryShoesEntity.getMaterial(), 
        categoryShoesEntity.getSole(), 
        categoryShoesEntity.getOrigin(), 
        categoryShoesEntity.getWarranty(), 
        categoryShoesEntity.getGender(), 
        categoryShoesEntity.getProductId());

        return categoryShoesModel;
    }

    public CategoryShoesEntity convertCategoryShoesModelToCategoryShoesEntity(CategoryShoesModel categoryShoesModel){
        CategoryShoesEntity categoryShoesEntity  = new CategoryShoesEntity(categoryShoesModel.getId(), 
        categoryShoesModel.getStyle(), 
        categoryShoesModel.getSize(), 
        categoryShoesModel.getColor() ,
        categoryShoesModel.getHeight(), 
        categoryShoesModel.getWeight(), 
        categoryShoesModel.getMaterial(), 
        categoryShoesModel.getSole(), 
        categoryShoesModel.getOrigin(),
        categoryShoesModel.getWarranty(), 
        categoryShoesModel.getGender(), 
        categoryShoesModel.getProductId());

        return categoryShoesEntity;
    }
}
