package ute.tlcn.begroup2.Controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.SellerServices.ProductService;
import ute.tlcn.begroup2.Services.SellerServices.SellerService;
import ute.tlcn.begroup2.Services.SellerServices.StoreService;

@RestController
@RequestMapping("/seller")
@Slf4j
public class SellerController {
    
    private SellerService sellerService;
    private StoreService storeService;
    private ProductService productService;


    @Autowired
    public SellerController(SellerService sellerService, StoreService storeService, ProductService productService) {
        this.sellerService = sellerService;
        this.storeService = storeService;
        this.productService = productService;
    }
    
    


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpModel signUpModel){
        log.info("Go to seller signup");
        try {
            UserModel userModel = sellerService.signUp(signUpModel);
            return new ResponseEntity<>(userModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Username is existed");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/store")
    public ResponseEntity<?> createStore(@RequestParam(value = "userId") int userId,
    @RequestParam(value = "nameStore") String nameStore,
    @RequestParam(value = "storeDescription") String storeDescription,
    @RequestParam("file") MultipartFile multipartFile){
        try {
            //StoreModel storeModel  = new StoreModel(0, 2, "test", "this is a first step", "");
            StoreModel storeModel = new StoreModel(0, userId, nameStore, storeDescription, "");
            storeModel = storeService.createStore(storeModel, multipartFile);
            return new ResponseEntity<>(storeModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Store is already existed");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/store/userid/{id}")
    public ResponseEntity<?> getStoreByUserId(@PathVariable("id") int userId){

        try {
            List<StoreModel> storeModels = storeService.getStoreByUserId(userId);
            return new ResponseEntity<>(storeModels, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Cannot get stores by user id");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/store/{id}")
    public ResponseEntity<?> deleteStoreById(@PathVariable("id") int id){
        try {
            storeService.deleteStore(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Cannot delete this store");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/store/{id}")
    public ResponseEntity<?> updateStoreWithoutImage(@PathVariable("id") int id, @RequestBody StoreModel storeModel){
        try {
            storeModel = storeService.updateStoreWithoutImage(id, storeModel);
            return new ResponseEntity<>(storeModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Cannot update store");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/store/image/{id}")
    public ResponseEntity<?> updateStoreWithImage(@PathVariable("id") int id, @RequestParam("file") MultipartFile multipartFile){
        try {
            StoreModel storeModel = storeService.updateStoreWithImage(id, multipartFile);
            return new ResponseEntity<>(storeModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Cannot update store");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value="/product")
    public ResponseEntity<?> createProduct(@RequestParam("storeid") int storeid, 
    @RequestParam("category") int category, 
    @RequestParam("name") String name,
    @RequestParam("quantity") int quantity,
    @RequestParam("price") double price,
    @RequestParam("description") String description,
    @RequestParam("file") MultipartFile multipartFile) {
        try {
            ProductModel productModel = new ProductModel(0, storeid, category, name, quantity, price, description, "");
            productModel = productService.createProduct(productModel, multipartFile);
            return new ResponseEntity<>(productModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't create product");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProductByProductId(@PathVariable("id") int id){
        try {
            ProductModel productModel= productService.getProductByProductId(id);
            return new ResponseEntity<>(productModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't find product");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/store/{id}")
    public ResponseEntity<?> getProductsByStoreId(@PathVariable("id") int id){
        List<ProductModel> productModels = productService.getProductByStoreId(id);
        return new ResponseEntity<>(productModels, HttpStatus.OK);
    }

    
}
