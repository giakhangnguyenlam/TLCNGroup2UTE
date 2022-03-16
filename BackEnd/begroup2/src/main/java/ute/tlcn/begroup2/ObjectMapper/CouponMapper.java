package ute.tlcn.begroup2.ObjectMapper;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.CouponEntity;
import ute.tlcn.begroup2.Models.SellerModels.CouponModel;

@Component
public class CouponMapper {
    
    public CouponEntity convertCouponModelToCouponEntity(CouponModel couponModel){
        CouponEntity coupon =  new CouponEntity(0, couponModel.getProductId(), 
        couponModel.getCouponName(), 
        couponModel.getCouponDesc(), 
        couponModel.getDiscount(), 
        couponModel.getStartDate(), 
        couponModel.getExpireDate());

        return coupon;
    }

    public CouponModel convertCouponEntityToCouponModel(CouponEntity couponEntity){
        CouponModel couponModel = new CouponModel(couponEntity.getCouponId(), couponEntity.getProductId(), 
        couponEntity.getCouponName(), 
        couponEntity.getCouponDesc(), 
        couponEntity.getDiscount(), 
        couponEntity.getStartDate(), 
        couponEntity.getExpireDate(), 
        false);

        if(isActive(couponEntity.getExpireDate())){
            couponModel.setIsActive(true);
        }

        return couponModel;
    }

    public List<CouponModel> convertListCouponEntityToListCouponModel(List<CouponEntity> couponEntities){
        List<CouponModel> couponModels = couponEntities.stream()
        .map(couponEntity -> convertCouponEntityToCouponModel(couponEntity))
        .collect(Collectors.toList());
    
        return couponModels;
    }

    private boolean isActive(long expireDate){
        long time = new Date().getTime();
        if(time<=expireDate){
            return true;
        }

        return false;
    }
}
