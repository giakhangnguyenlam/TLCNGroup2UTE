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
import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;
import ute.tlcn.begroup2.Models.SellerModels.CategoryClothesModel;
import ute.tlcn.begroup2.Models.SellerModels.CategoryShoesModel;
import ute.tlcn.begroup2.Models.SellerModels.CouponModel;
import ute.tlcn.begroup2.Models.SellerModels.MessageModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.OrderDetailModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.SellerServices.CategoryAccessoriesService;
import ute.tlcn.begroup2.Services.SellerServices.CategoryClothesService;
import ute.tlcn.begroup2.Services.SellerServices.CategoryShoesService;
import ute.tlcn.begroup2.Services.SellerServices.CouponService;
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
    private CategoryClothesService categoryClothesService;
    private CategoryShoesService  categoryShoesService;
    private CategoryAccessoriesService categoryAccessoriesService;
    private CouponService couponService;

    @Autowired
    public SellerController(SellerService sellerService, StoreService storeService, ProductService productService, CategoryClothesService categoryClothesService, CategoryShoesService categoryShoesService, CategoryAccessoriesService categoryAccessoriesService, CouponService couponService) {
        this.sellerService = sellerService;
        this.storeService = storeService;
        this.productService = productService;
        this.categoryClothesService = categoryClothesService;
        this.categoryShoesService = categoryShoesService;
        this.categoryAccessoriesService = categoryAccessoriesService;
        this.couponService = couponService;
    }
    

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpModel signUpModel){
        log.info("Go to seller signup");
        try {
            UserModel userModel = sellerService.signUp(signUpModel);
            return new ResponseEntity<>(userModel, HttpStatus.CREATED);
        } catch (Exception e) {
            MessageModel messageModel = new MessageModel("Username is existed");
            return new ResponseEntity<>(messageModel, HttpStatus.BAD_REQUEST);
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
            ProductModel productModel = new ProductModel(0, storeid, category, name, quantity, price, description, "", false, 0);
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

    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProductWithoutImageByProductId(@PathVariable("id") int id, @RequestBody ProductModel productModel){
        try {
            productModel = productService.updateProductWithoutImageByProductId(id, productModel);
            return new ResponseEntity<>(productModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't update product");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/image/{id}")
    public ResponseEntity<?> updateProductWithImageByProductId(@PathVariable("id") int id, @RequestParam("file") MultipartFile multipartFile){
        try {
            ProductModel productModel = productService.updateProductWithImageByProductId(id, multipartFile);
            return new ResponseEntity<>(productModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't update product");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    } 
    
    @DeleteMapping("/product/{id}/category/{category}")
    public ResponseEntity<?> deleteProductByProductId(@PathVariable("id") int id, @PathVariable("category") int category){
        try {
            productService.deleteProductByProductId(id, category);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't delete product");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/product/categoryclothes")
    public ResponseEntity<?> createCategoryClothes(@RequestBody CategoryClothesModel categoryClothesModel){
        try {
            categoryClothesModel = categoryClothesService.createCategoryClothes(categoryClothesModel);
            return new ResponseEntity<>(categoryClothesModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't create category clothes");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/categoryclothes/{productid}")
    public ResponseEntity<?> updateCategoryClothes(@PathVariable("productid") int productId, @RequestBody CategoryClothesModel categoryClothesModel){
        try {
            categoryClothesModel = categoryClothesService.updateCategoryClothes(productId, categoryClothesModel);
            return new ResponseEntity<>(categoryClothesModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't update category clothes");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/product/categoryshoes")
    public ResponseEntity<?> createCategoryShoes(@RequestBody CategoryShoesModel categoryShoesModel){
        try {
            categoryShoesModel = categoryShoesService.createCategoryShoes(categoryShoesModel);
            return new ResponseEntity<>(categoryShoesModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't create category shoes");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/categoryshoes/{productid}")
    public ResponseEntity<?> updateCategoryShoes(@PathVariable("productid") int productId, @RequestBody CategoryShoesModel categoryShoesModel){
        try {
            categoryShoesModel = categoryShoesService.updateCategoryShoes(productId, categoryShoesModel);
            return new ResponseEntity<>(categoryShoesModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't update category shoes");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/product/categoryaccessories")
    public ResponseEntity<?> createCategoryAccessories(@RequestBody CategoryAccessoriesModel categoryAccessoriesModel){
        try {
            categoryAccessoriesModel = categoryAccessoriesService.createCategoryAccessories(categoryAccessoriesModel);
            return new ResponseEntity<>(categoryAccessoriesModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't create category accessories");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/categoryaccessories/{productid}")
    public ResponseEntity<?> updateCategoryAccessories(@PathVariable("productid") int productId, @RequestBody CategoryAccessoriesModel categoryAccessoriesModel){
        try {
            categoryAccessoriesModel =  categoryAccessoriesService.updateCategoryAccessories(productId, categoryAccessoriesModel);
            return new ResponseEntity<>(categoryAccessoriesModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't update category accessories");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrderByStoreId(@PathVariable("id") int id){
        log.info("Go to get order by store id controller");
        List<OrderDetailModel> orderDetailModels= storeService.getOrderProductByStoreId(id);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }


    @GetMapping("/store/{id}")
    public ResponseEntity<?> getStoreByStoreId(@PathVariable("id") int id){
        try {
            StoreModel storeModel = storeService.getStoreByStoreId(id);
            return new ResponseEntity<>(storeModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel= new ErrorModel("Can't find store");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/orderdetail/status/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable("id") int id){
        storeService.updateOrderDetailStatus(id);
        MessageModel mess = new MessageModel("Update order detail status successfully");
        return new ResponseEntity<>(mess, HttpStatus.OK);
    }

    @GetMapping("/order/{id}/statusfinished")
    public ResponseEntity<?> staticByStoreId(@PathVariable("id") int id){
        log.info("Go to static by store id");
        List<OrderDetailModel> orderDetailModels = storeService.staticByStoreId(id);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @GetMapping("/order/{id}/date/{date}")
    public ResponseEntity<?> staticByStoreIdAndDate(@PathVariable("id") int id, @PathVariable("date") String date){
        log.info("Go to static by store id and date");
        List<OrderDetailModel> orderDetailModels = storeService.staticByStoreIdAndDate(id, date);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @GetMapping("/order/{id}/month/{month}/year/{year}")
    public ResponseEntity<?> staticByStoreIdAndMonthAndYear(@PathVariable("id") int id, @PathVariable("month") String month, @PathVariable("year") String year){
        List<OrderDetailModel> orderDetailModels = storeService.staticByStoreIdAndMonthAndYear(id, month, year);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @GetMapping("/order/{id}/year/{year}")
    public ResponseEntity<?> staticByStoreIdAndYear(@PathVariable("id") int id, @PathVariable("year") String year){
        List<OrderDetailModel> orderDetailModels = storeService.staticByStoreIdAndYear(id, year);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @GetMapping("/order/{id}/quarter/{quarter}/year/{year}")
    public ResponseEntity<?> staticByStoreIdAndQuarterOfYear(@PathVariable("id") int id, @PathVariable("quarter") int quarter, @PathVariable("year") String year){
        List<OrderDetailModel> orderDetailModels = storeService.staticByStoreIdAndQuarterOfYear(id, quarter, year);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @GetMapping("/order/{id}/datestart/{datestart}/dateend/{dateend}")
    public ResponseEntity<?> staticByStoreIdAndDateOption(@PathVariable("id") int id, @PathVariable("datestart") String datestart, @PathVariable("dateend") String dateend){
        List<OrderDetailModel> orderDetailModels = storeService.staticByStoreIdAndDateOption(id, datestart, dateend);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @PostMapping("/coupon")
    public ResponseEntity<?> createCoupon(@RequestBody CouponModel couponModel){
        try {
            couponModel = couponService.createCoupon(couponModel);
            return new ResponseEntity<>(couponModel, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/coupon/{couponId}")
    public ResponseEntity<?> updateCoupon(@PathVariable("couponId") int couponId, @RequestBody CouponModel couponModel){
        try {
            couponModel = couponService.updateCoupon(couponId, couponModel);
            return new ResponseEntity<>(couponModel, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/coupon/productid/{productId}")
    public ResponseEntity<?> getAllCouponByProductId(@PathVariable("productId") int productId){
        List<CouponModel> couponModels = couponService.getCouponByProductId(productId);
        return new ResponseEntity<>(couponModels, HttpStatus.OK);
    }

    @PutMapping("/coupon/active/{couponId}")
    public ResponseEntity<?> changeActiveCoupon(@PathVariable("couponId") int couponId){
        try {
            couponService.changeActiveCoupon(couponId);
            return new ResponseEntity<>(new MessageModel("Update successfully"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/coupon/{couponId}")
    public ResponseEntity<?> getCouponByCouponId(@PathVariable("couponId") int couponId){
        try {
            CouponModel couponModel = couponService.getCouponByCouponId(couponId);
            return new ResponseEntity<>(couponModel, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new MessageModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
