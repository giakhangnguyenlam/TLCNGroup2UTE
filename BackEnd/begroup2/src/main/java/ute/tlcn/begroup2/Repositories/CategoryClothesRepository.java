package ute.tlcn.begroup2.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.CategoryClothesEntity;

@Repository
public interface CategoryClothesRepository extends JpaRepository<CategoryClothesEntity, Integer> {
    Optional<CategoryClothesEntity> findByProductId(int productId);
}
