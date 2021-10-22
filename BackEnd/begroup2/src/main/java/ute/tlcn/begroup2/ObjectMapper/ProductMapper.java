package ute.tlcn.begroup2.ObjectMapper;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<ProductModel> convertListProductEntityToListProductModel(List<ProductEntity> productEntities){
        List<ProductModel> productModels = productEntities.stream()
        .map((productEntity) -> {
            return convertProductEntityToProductModel(productEntity);
        })
        .collect(Collectors.toList());
        
        return productModels;
    }
}
