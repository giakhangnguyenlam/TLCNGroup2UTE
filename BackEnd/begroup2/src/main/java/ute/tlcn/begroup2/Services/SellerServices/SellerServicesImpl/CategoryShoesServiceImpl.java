package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.CategoryShoesEntity;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryShoesModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.ObjectMapper.CategoryShoesMapper;
import ute.tlcn.begroup2.ObjectMapper.ProductMapper;
import ute.tlcn.begroup2.Repositories.CategoryShoesRepository;
import ute.tlcn.begroup2.Repositories.ProductRepository;
import ute.tlcn.begroup2.Services.SellerServices.CategoryShoesService;

@Service
public class CategoryShoesServiceImpl implements CategoryShoesService {

    private CategoryShoesMapper categoryShoesMapper;
    private CategoryShoesRepository categoryShoesRepository;
    private ProductRepository productRepository;
    private ProductMapper productMapper;

    @Autowired
    public CategoryShoesServiceImpl(CategoryShoesMapper categoryShoesMapper, CategoryShoesRepository categoryShoesRepository, ProductRepository productRepository, ProductMapper productMapper) {
        this.categoryShoesMapper = categoryShoesMapper;
        this.categoryShoesRepository = categoryShoesRepository;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }
    

    @Override
    public CategoryShoesModel createCategoryShoes(CategoryShoesModel categoryShoesModel) {
        CategoryShoesEntity categoryShoesEntity = categoryShoesMapper.convertCategoryShoesModelToCategoryShoesEntity(categoryShoesModel);
        return categoryShoesMapper.convertCategoryShoesEntityToCategoryShoesModel(categoryShoesRepository.save(categoryShoesEntity));
    }

    @Override
    public CategoryShoesModel updateCategoryShoes(int productId, CategoryShoesModel categoryShoesModel)
            throws Exception {
        Optional<CategoryShoesEntity> optionalCategoryShoes = categoryShoesRepository.findByProductId(productId);
        if (optionalCategoryShoes.isPresent()) {
            CategoryShoesEntity categoryShoesEntity = optionalCategoryShoes.get();
            categoryShoesEntity.setStyle(categoryShoesModel.getStyle());
            categoryShoesEntity.setSize(categoryShoesModel.getSize());
            categoryShoesEntity.setColor(categoryShoesModel.getColor());
            categoryShoesEntity.setHeight(categoryShoesModel.getHeight());
            categoryShoesEntity.setWeight(categoryShoesModel.getWeight());
            categoryShoesEntity.setMaterial(categoryShoesModel.getMaterial());
            categoryShoesEntity.setSole(categoryShoesModel.getSole());
            categoryShoesEntity.setOrigin(categoryShoesModel.getOrigin());
            categoryShoesEntity.setWarranty(categoryShoesModel.getWarranty());
            categoryShoesEntity.setGender(categoryShoesModel.getGender());
            return categoryShoesMapper.convertCategoryShoesEntityToCategoryShoesModel(categoryShoesRepository.save(categoryShoesEntity));
        } else {
            throw new NotFoundException("Can't find category shoes");
        }
    }

    @Override
    public CategoryShoesModel getCategoryShoesByProductId(int productId) throws Exception {
        Optional<CategoryShoesEntity> optionalCategoryShoes = categoryShoesRepository.findByProductId(productId);
        if(optionalCategoryShoes.isPresent()){
            return categoryShoesMapper.convertCategoryShoesEntityToCategoryShoesModel(optionalCategoryShoes.get());
        }
        else{
            throw new NotFoundException("Can't find category shoes");
        }
    }

    @Override
    public List<ProductModel> getCategoryShoesByStyle(String style) {
        List<CategoryShoesEntity> categoryShoesEntities = categoryShoesRepository.getByStyle(style);
        List<ProductModel> productModels = categoryShoesEntities.stream()
        .map((categoryShoesEntity) -> {
            Optional<ProductEntity> productEntity = productRepository.findById(categoryShoesEntity.getProductId());
            if(productEntity.isPresent()){
                return productMapper.convertProductEntityToProductModel(productEntity.get());
            }
            return null;
        })
        .collect(Collectors.toList());

        return productModels;
    }
    
}
