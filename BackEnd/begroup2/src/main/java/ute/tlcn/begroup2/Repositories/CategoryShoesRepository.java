package ute.tlcn.begroup2.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ute.tlcn.begroup2.Entities.CategoryShoesEntity;

@Repository
public interface CategoryShoesRepository extends JpaRepository<CategoryShoesEntity, Integer> {
    Optional<CategoryShoesEntity> findByProductId(int productId);
}
