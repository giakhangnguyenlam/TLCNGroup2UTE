package ute.tlcn.begroup2.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> getByUserId(int userId);
}
