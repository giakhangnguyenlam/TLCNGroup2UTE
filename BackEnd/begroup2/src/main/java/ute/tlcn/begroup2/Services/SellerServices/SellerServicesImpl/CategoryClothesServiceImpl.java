package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.CategoryClothesEntity;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryClothesModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.ObjectMapper.CategoryClothesMapper;
import ute.tlcn.begroup2.ObjectMapper.ProductMapper;
import ute.tlcn.begroup2.Repositories.CategoryClothesRepository;
import ute.tlcn.begroup2.Repositories.ProductRepository;
import ute.tlcn.begroup2.Services.SellerServices.CategoryClothesService;

@Service
public class CategoryClothesServiceImpl implements CategoryClothesService {

    private CategoryClothesRepository categoryClothesRepository;
    private CategoryClothesMapper categoryClothesMapper;
    private ProductRepository productRepository;
    private ProductMapper productMapper;

    @Autowired
    public CategoryClothesServiceImpl(CategoryClothesRepository categoryClothesRepository, CategoryClothesMapper categoryClothesMapper, ProductRepository productRepository, ProductMapper productMapper) {
        this.categoryClothesRepository = categoryClothesRepository;
        this.categoryClothesMapper = categoryClothesMapper;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }
    


    @Override
    public CategoryClothesModel createCategoryClothes(CategoryClothesModel categoryClothesModel) {
        CategoryClothesEntity categoryClothesEntity =  categoryClothesMapper.convertCategoryClothesModelToCategoryClothesEntity(categoryClothesModel);
        return categoryClothesMapper.convertCategoryClothesEntityToCategoryClothesModel(categoryClothesRepository.save(categoryClothesEntity));
    }

    @Override
    public CategoryClothesModel updateCategoryClothes(int productId, CategoryClothesModel categoryClothesModel)
            throws Exception {
        Optional<CategoryClothesEntity> optionalCategoryClothesEntity = categoryClothesRepository.findByProductId(productId);
        if (optionalCategoryClothesEntity.isPresent()) {
            CategoryClothesEntity categoryClothesEntity = optionalCategoryClothesEntity.get();
            categoryClothesEntity.setType(categoryClothesModel.getType());
            categoryClothesEntity.setBrand(categoryClothesModel.getBrand());
            categoryClothesEntity.setOrigin(categoryClothesModel.getOrigin());
            categoryClothesEntity.setSize(categoryClothesModel.getSize());
            categoryClothesEntity.setColor(categoryClothesModel.getColor());
            categoryClothesEntity.setMaterial(categoryClothesModel.getMaterial());
            categoryClothesEntity.setGender(categoryClothesModel.getGender());
            return categoryClothesMapper.convertCategoryClothesEntityToCategoryClothesModel(categoryClothesRepository.save(categoryClothesEntity));
        }
        else{
            throw new NotFoundException("Can't find CategoryClothes");
        }
    }

    @Override
    public CategoryClothesModel getCategoryClothesByProductId(int productId) throws Exception {
        Optional<CategoryClothesEntity> optionalCategoryClothesEntity = categoryClothesRepository.findByProductId(productId);
        if (optionalCategoryClothesEntity.isPresent()) {
            return categoryClothesMapper.convertCategoryClothesEntityToCategoryClothesModel(optionalCategoryClothesEntity.get());
        }
        else{
            throw new NotFoundException("Can't find CategoryClothes");
        }
    }


    @Override
    public List<ProductModel> getCategoryClothesByType(String type) {
        List<CategoryClothesEntity> categoryClothesEntities = categoryClothesRepository.getByType(type);
        List<ProductModel> productModels = categoryClothesEntities.stream()
        .map((categoryClothesEntity) -> {
            Optional<ProductEntity> productEntity = productRepository.findById(categoryClothesEntity.getProductId());
            if(productEntity.isPresent()){
                return productMapper.convertProductEntityToProductModel(productEntity.get());
            }
            return null;
        }).collect(Collectors.toList());

        return productModels;
    }
    
}
