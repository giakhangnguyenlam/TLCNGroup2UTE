package ute.tlcn.begroup2.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.StoreEntity;

@Repository
public interface StoreRepository extends JpaRepository<StoreEntity, Integer> {
    boolean existsByNameStore(String storeName);
    List<StoreEntity> getByUserId(int userId);
}
