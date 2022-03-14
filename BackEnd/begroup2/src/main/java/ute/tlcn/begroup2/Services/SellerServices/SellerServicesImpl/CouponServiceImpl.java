package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.CouponEntity;
import ute.tlcn.begroup2.Models.SellerModels.CouponModel;
import ute.tlcn.begroup2.ObjectMapper.CouponMapper;
import ute.tlcn.begroup2.Repositories.CouponRepository;
import ute.tlcn.begroup2.Services.SellerServices.CouponService;

@Service
public class CouponServiceImpl implements CouponService {

    private CouponRepository couponRepository;
    private CouponMapper couponMapper;

    @Autowired
    public CouponServiceImpl(CouponRepository couponRepository, CouponMapper couponMapper) {
        this.couponRepository = couponRepository;
        this.couponMapper = couponMapper;
    }
    
    @Override
    public CouponModel createCoupon(CouponModel couponModel) {
        CouponEntity couponEntity = couponMapper.convertCouponModelToCouponEntity(couponModel);
        couponEntity = couponRepository.save(couponEntity);
        return couponMapper.convertCouponEntityToCouponModel(couponEntity);
    }

    @Override
    public CouponModel updateCoupon(int couponId, CouponModel couponModel) throws NotFoundException {
        Optional<CouponEntity> optionalCouponEntity = couponRepository.findById(couponId);
        if(optionalCouponEntity.isPresent()){
            CouponEntity couponEntity = couponMapper.convertCouponModelToCouponEntity(couponModel);
            couponEntity = couponRepository.save(couponEntity);
            return couponMapper.convertCouponEntityToCouponModel(couponEntity);
        }
        else{
            throw new NotFoundException("Can't find");
        }
    }

    @Override
    public List<CouponModel> getCouponByProductId(int productId) {
        List<CouponEntity> couponEntities = couponRepository.getByProductId(productId);
        return couponMapper.convertListCouponEntityToListCouponModel(couponEntities);
    }

    @Override
    public void deleteCoupon(int couponId) throws NotFoundException {
        try {
            couponRepository.deleteById(couponId);
        } catch (Exception e) {
            throw new NotFoundException("can't find");
        }
        
    
    }

    @Override
    public void changeActiveCoupon(int couponId) throws NotFoundException {
        Optional<CouponEntity> optionalCouponEntity = couponRepository.findById(couponId);
        if(optionalCouponEntity.isPresent()){
            CouponEntity couponEntity = optionalCouponEntity.get();
            couponEntity.setExpireDate(couponEntity.getStartDate());
            couponRepository.save(couponEntity);
        }
        else{
            throw new NotFoundException("Can't find");
        }
        
    }



    @Override
    public Optional<CouponModel> getActiveCoupon(int productId) {
        
        List<CouponModel> couponModels = getCouponByProductId(productId);
        Date date = new Date();
        long milisecond = date.getTime();
        Optional<CouponModel> couponModel = couponModels.stream()
        .filter(couponModell -> {
            return (couponModell.getStartDate()<= milisecond && couponModell.getExpireDate()>= milisecond);
        }).findFirst();

        return couponModel;
    }

    @Override
    public CouponModel getCouponByCouponId(int couponId) {
        Optional<CouponEntity> optionalCoupon = couponRepository.findById(couponId);
        if(optionalCoupon.isPresent()){
            return couponMapper.convertCouponEntityToCouponModel(optionalCoupon.get());
        }
        return null;
    }
    
}
