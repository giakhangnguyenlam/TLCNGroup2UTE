package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.CategoryAccessoriesEntity;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.ObjectMapper.CategoryAccessoriesMapper;
import ute.tlcn.begroup2.ObjectMapper.ProductMapper;
import ute.tlcn.begroup2.Repositories.CategoryAccessoriesRepository;
import ute.tlcn.begroup2.Repositories.ProductRepository;
import ute.tlcn.begroup2.Services.SellerServices.CategoryAccessoriesService;

@Service
public class CategoryAccessoriesServiceImpl implements CategoryAccessoriesService {

    private CategoryAccessoriesRepository categoryAccessoriesRepository;
    private CategoryAccessoriesMapper categoryAccessoriesMapper;
    private ProductRepository productRepository;
    private ProductMapper productMapper;

    @Autowired
    public CategoryAccessoriesServiceImpl(CategoryAccessoriesRepository categoryAccessoriesRepository, CategoryAccessoriesMapper categoryAccessoriesMapper, ProductRepository productRepository, ProductMapper productMapper) {
        this.categoryAccessoriesRepository = categoryAccessoriesRepository;
        this.categoryAccessoriesMapper = categoryAccessoriesMapper;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
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


    @Override
    public List<ProductModel> getCategoryAccessoriesByType(String type) {
        List<CategoryAccessoriesEntity> categoryAccessoriesEntities = categoryAccessoriesRepository.getByType(type);
        List<ProductModel> productModels = categoryAccessoriesEntities.stream()
        .map((categoryAccessoriesEntity) -> {
            ProductEntity productEntity = productRepository.getById(categoryAccessoriesEntity.getProductId());
            return productMapper.convertProductEntityToProductModel(productEntity);
        })
        .collect(Collectors.toList());

        return productModels;
    }
    
}
