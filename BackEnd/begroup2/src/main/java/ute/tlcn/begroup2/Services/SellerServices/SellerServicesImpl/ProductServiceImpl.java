package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.ObjectMapper.ProductMapper;
import ute.tlcn.begroup2.Repositories.ProductRepository;
import ute.tlcn.begroup2.Services.GoogleServices.GoogleService;
import ute.tlcn.begroup2.Services.SellerServices.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductMapper productMapper;
    private ProductRepository productRepository;
    private GoogleService googleService;

    @Autowired
    public ProductServiceImpl(ProductMapper productMapper, ProductRepository productRepository, GoogleService googleService) {
        this.productMapper = productMapper;
        this.productRepository = productRepository;
        this.googleService = googleService;
    }


    @Override
    public ProductModel createProduct(ProductModel productModel, MultipartFile multifile) {
        String image = googleService.saveImage(multifile);
        productModel.setImage(image);
        ProductEntity productEntity = productMapper.convertProductModelToProductEntity(productModel);
        return productMapper.convertProductEntityToProductModel(productRepository.save(productEntity));
    }

    @Override
    public ProductModel getProductByProductId(int id) throws NotFoundException{
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(id);
        if(optionalProductEntity.isPresent()){
            return productMapper.convertProductEntityToProductModel(optionalProductEntity.get());
        }
        else
        {
            throw new NotFoundException("Cannot find product");
        }
    }

    @Override
    public List<ProductModel> getProductByStoreId(int storeId) {
        List<ProductModel> productModels = productRepository.getByStoreId(storeId).stream()
        .map((productEntity) -> {
            return productMapper.convertProductEntityToProductModel(productEntity);
        })
        .collect(Collectors.toList());
        return productModels;    
    }


    @Override
    public void deleteProductByProductId(int id) {
        productRepository.deleteById(id);
    }


    @Override
    public ProductModel updateProductWithoutImageByProductId(int id, ProductModel productModel) throws Exception {
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(id);
        if (optionalProductEntity.isPresent()) {
            ProductEntity productEntity = optionalProductEntity.get();
            productEntity.setName(productModel.getName());
            productEntity.setQuantity(productModel.getQuantity());
            productEntity.setPrice(productModel.getPrice());
            productEntity.setDescription(productModel.getDescription());
            return productMapper.convertProductEntityToProductModel(productRepository.save(productEntity));
        } else {
            throw new NotFoundException("Cannot found product");
        }
    }


    @Override
    public ProductModel updateProductWithImageByProductId(int id, MultipartFile multipartFile) throws Exception {
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(id);
        if(optionalProductEntity.isPresent()){
            ProductEntity productEntity = optionalProductEntity.get();
            String image = googleService.saveImage(multipartFile);
            productEntity.setImage(image);
            return productMapper.convertProductEntityToProductModel(productRepository.save(productEntity));
        }
        else
        {
            throw new NotFoundException("Cannot found product");
        }
    }


    @Override
    public List<ProductModel> getAllProducts() {
        List<ProductEntity> productEntities = productRepository.findAll();
        List<ProductModel> productModels = productEntities.stream()
        .map((productEntity) -> {
            return productMapper.convertProductEntityToProductModel(productEntity);
        })
        .collect(Collectors.toList());
        return productModels;  
    }
    
}
