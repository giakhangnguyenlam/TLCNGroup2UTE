package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;
import java.util.Optional;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Models.SellerModels.CouponModel;

public interface CouponService {
    public CouponModel createCoupon(CouponModel couponModel);
    public CouponModel updateCoupon(int couponId, CouponModel couponModel) throws NotFoundException;
    public List<CouponModel> getCouponByProductId(int productId);
    public void deleteCoupon(int couponId) throws NotFoundException;
    public void changeActiveCoupon(int couponId) throws NotFoundException;
    public Optional<CouponModel> getActiveCoupon(int productId);
    public CouponModel getCouponByCouponId(int couponId);
}
