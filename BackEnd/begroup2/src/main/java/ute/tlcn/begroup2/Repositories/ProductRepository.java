package ute.tlcn.begroup2.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    List<ProductEntity> getByStoreId(int storeId);
    List<ProductEntity> getByCategory(int category);
    List<ProductEntity> getAllByName(String name);
}
