package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.CategoryShoesEntity;
import ute.tlcn.begroup2.Models.SellerModels.CategoryShoesModel;
import ute.tlcn.begroup2.ObjectMapper.CategoryShoesMapper;
import ute.tlcn.begroup2.Repositories.CategoryShoesRepository;
import ute.tlcn.begroup2.Services.SellerServices.CategoryShoesService;

@Service
public class CategoryShoesServiceImpl implements CategoryShoesService {

    private CategoryShoesMapper categoryShoesMapper;
    private CategoryShoesRepository categoryShoesRepository;

    @Autowired
    public CategoryShoesServiceImpl(CategoryShoesMapper categoryShoesMapper, CategoryShoesRepository categoryShoesRepository) {
        this.categoryShoesMapper = categoryShoesMapper;
        this.categoryShoesRepository = categoryShoesRepository;
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
    public List<CategoryShoesModel> getCategoryShoesByStyle(String style) {
        List<CategoryShoesEntity> categoryShoesEntities = categoryShoesRepository.getByStyle(style);
        return categoryShoesMapper.convertListCategoryShoesEntitesToListCategoryShoesModels(categoryShoesEntities);
    }
    
}
