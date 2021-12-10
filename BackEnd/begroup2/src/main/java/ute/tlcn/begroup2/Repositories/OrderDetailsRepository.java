package ute.tlcn.begroup2.Repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.OrderDetailEntity;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetailEntity, Integer> {
    List<OrderDetailEntity> getByOrderId(int orderId);
    List<OrderDetailEntity> getByProductId(int productId);
    List<OrderDetailEntity> getByProductIdAndDate(int productId, Date date);
    OrderDetailEntity getOneByProductId(int productId);
    OrderDetailEntity getOneByOrderId(int orderId);
    List<OrderDetailEntity> getByProductIdAndStatus(int productId, String status);
    List<OrderDetailEntity> getByProductIdAndStatusAndDate(int productId, String status, Date date);
    List<OrderDetailEntity> getByProductIdAndStatusAndDateBetween(int productId, String status, Date dateStart, Date dateEnd);
}
