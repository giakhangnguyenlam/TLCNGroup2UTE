package ute.tlcn.begroup2.ObjectMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Models.SellerModels.CouponModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Services.SellerServices.CouponService;

@Component
public class ProductMapper {

    private CouponService couponService;

    @Autowired
    public ProductMapper(CouponService couponService) {
        this.couponService = couponService;
    }
    
    public ProductModel convertProductEntityToProductModel(ProductEntity productEntity){
        ProductModel productModel = new ProductModel(productEntity.getId(), 
        productEntity.getStoreId(), 
        productEntity.getCategory(),
        productEntity.getName(), 
        productEntity.getQuantity(), 
        productEntity.getPrice(), 
        productEntity.getDescription(), 
        productEntity.getImage(), false, 0);

        Optional<CouponModel> optionalCoupon = couponService.getActiveCoupon(productModel.getId());
        if(optionalCoupon.isPresent()){
            productModel.setIsDiscount(true);
            productModel.setDiscount(optionalCoupon.get().getDiscount());
        }
        
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
