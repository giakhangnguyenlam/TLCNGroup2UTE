package ute.tlcn.begroup2.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ute.tlcn.begroup2.Entities.CategoryAccessoriesEntity;

public interface CategoryAccessoriesRepository extends JpaRepository<CategoryAccessoriesEntity, Integer> {
    Optional<CategoryAccessoriesEntity> findByProductId(int productId);
}
