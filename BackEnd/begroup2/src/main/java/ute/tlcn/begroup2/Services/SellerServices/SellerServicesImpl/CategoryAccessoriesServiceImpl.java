package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.CategoryAccessoriesEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;
import ute.tlcn.begroup2.ObjectMapper.CategoryAccessoriesMapper;
import ute.tlcn.begroup2.Repositories.CategoryAccessoriesRepository;
import ute.tlcn.begroup2.Services.SellerServices.CategoryAccessoriesService;

@Service
public class CategoryAccessoriesServiceImpl implements CategoryAccessoriesService {

    private CategoryAccessoriesRepository categoryAccessoriesRepository;
    private CategoryAccessoriesMapper categoryAccessoriesMapper;

    @Autowired
    public CategoryAccessoriesServiceImpl(CategoryAccessoriesRepository categoryAccessoriesRepository, CategoryAccessoriesMapper categoryAccessoriesMapper) {
        this.categoryAccessoriesRepository = categoryAccessoriesRepository;
        this.categoryAccessoriesMapper = categoryAccessoriesMapper;
    }


    @Override
    public CategoryAccessoriesModel createCategoryAccessories(CategoryAccessoriesModel categoryAccessoriesModel) {
        CategoryAccessoriesEntity categoryAccessoriesEntity = categoryAccessoriesMapper.convertCategoryAccessoriesModelToCategoryAccessoriesEntity(categoryAccessoriesModel);
        return categoryAccessoriesMapper.convertCategoryAccessoriesEntityToCategoryAccessoriesModel(categoryAccessoriesRepository.save(categoryAccessoriesEntity));
    }

    @Override
    public CategoryAccessoriesModel updateCategoryAccessories(int productId,
            CategoryAccessoriesModel categoryAccessoriesModel) throws Exception {
        Optional<CategoryAccessoriesEntity> optionalCategoryAccessories = categoryAccessoriesRepository.findByProductId(productId);
        if (optionalCategoryAccessories.isPresent()) {
            CategoryAccessoriesEntity categoryAccessoriesEntity = optionalCategoryAccessories.get();
            categoryAccessoriesEntity.setType(categoryAccessoriesModel.getType());
            categoryAccessoriesEntity.setColor(categoryAccessoriesModel.getColor());
            categoryAccessoriesEntity.setBrand(categoryAccessoriesModel.getBrand());
            categoryAccessoriesEntity.setOrigin(categoryAccessoriesModel.getOrigin());
            categoryAccessoriesEntity.setMaterial(categoryAccessoriesModel.getMaterial());

            return categoryAccessoriesMapper.convertCategoryAccessoriesEntityToCategoryAccessoriesModel(categoryAccessoriesRepository.save(categoryAccessoriesEntity));
        } else {
            throw new NotFoundException("can't find category accessories");
        }
    }


    @Override
    public CategoryAccessoriesModel getCategoryAccessoriesByProductId(int productId) throws Exception {
        Optional<CategoryAccessoriesEntity> optionalCategoryAccessories = categoryAccessoriesRepository.findByProductId(productId);
        if (optionalCategoryAccessories.isPresent()) {
            CategoryAccessoriesEntity categoryAccessoriesEntity  = optionalCategoryAccessories.get();
            return categoryAccessoriesMapper.convertCategoryAccessoriesEntityToCategoryAccessoriesModel(categoryAccessoriesEntity);
        } else {
            throw new NotFoundException("can't find category accessories");
        }
    }
    
}
