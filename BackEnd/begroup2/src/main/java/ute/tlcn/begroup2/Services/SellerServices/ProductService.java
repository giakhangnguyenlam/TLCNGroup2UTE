package ute.tlcn.begroup2.Services.SellerServices;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;

public interface ProductService {
    public ProductModel createProduct(ProductModel productModel, MultipartFile multipartFile);
    public ProductModel getProductByProductId(int id) throws NotFoundException;
    public List<ProductModel> getProductByStoreId(int storeId);
    public ProductModel updateProductWithoutImageByProductId(int id, ProductModel productModel) throws Exception;
    public ProductModel updateProductWithImageByProductId(int id, MultipartFile multipartFile) throws Exception;
    public void deleteProductByProductId(int id, int category);
    public List<ProductModel> getAllProducts();
    public List<ProductModel> getAllProductsByCategory(int categoryId);
}
