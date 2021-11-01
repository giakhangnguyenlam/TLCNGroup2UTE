package ute.tlcn.begroup2.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.OrderDetailEntity;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetailEntity, Integer> {
    List<OrderDetailEntity> getByOrderId(int orderId);
    List<OrderDetailEntity> getByProductId(int productId);
    List<OrderDetailEntity> getByProductIdAndDate(int productId, String date);
}
