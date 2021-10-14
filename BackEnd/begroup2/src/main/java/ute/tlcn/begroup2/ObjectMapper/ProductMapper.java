package ute.tlcn.begroup2.ObjectMapper;

import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;

@Component
public class ProductMapper {
    
    public ProductModel convertProductEntityToProductModel(ProductEntity productEntity){
        ProductModel productModel = new ProductModel(productEntity.getId(), 
        productEntity.getStoreId(), 
        productEntity.getCategory(),
        productEntity.getName(), 
        productEntity.getQuantity(), 
        productEntity.getPrice(), 
        productEntity.getDescription(), 
        productEntity.getImage());

        return productModel;
    }

    public ProductEntity convertProductModelToProductEntity(ProductModel productModel){
        ProductEntity productEntity = new ProductEntity(productModel.getId(), 
        productModel.getStoreId(), 
        productModel.getCategory(), 
        productModel.getName(), 
        productModel.getQuantity(), 
        productModel.getPrice(), 
        productModel.getDescription(), 
        productModel.getImage());

        return productEntity;
    }
}
