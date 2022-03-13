package ute.tlcn.begroup2.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ute.tlcn.begroup2.Entities.CouponEntity;

public interface CouponRepository extends JpaRepository<CouponEntity, Integer> {
    List<CouponEntity> getByProductId(int productId);
    
}
