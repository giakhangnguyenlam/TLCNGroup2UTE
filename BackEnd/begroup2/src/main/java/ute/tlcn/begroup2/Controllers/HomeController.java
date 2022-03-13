package ute.tlcn.begroup2.Controllers;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ute.tlcn.begroup2.Models.SellerModels.CategoryAccessoriesModel;
import ute.tlcn.begroup2.Models.SellerModels.CategoryClothesModel;
import ute.tlcn.begroup2.Models.SellerModels.CategoryShoesModel;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Models.UserModels.CommentModel;
import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.SellerServices.CategoryAccessoriesService;
import ute.tlcn.begroup2.Services.SellerServices.CategoryClothesService;
import ute.tlcn.begroup2.Services.SellerServices.CategoryShoesService;
import ute.tlcn.begroup2.Services.SellerServices.ProductService;
import ute.tlcn.begroup2.Services.UserServices.UserService;

@RestController
public class HomeController {

    private UserService userService;
    private ProductService productService;
    private CategoryAccessoriesService categoryAccessoriesService;
    private CategoryShoesService categoryShoesService;
    private CategoryClothesService categoryClothesService;
    

    @Autowired
    public HomeController(UserService userService, ProductService productService, CategoryAccessoriesService categoryAccessoriesService, CategoryShoesService categoryShoesService, CategoryClothesService categoryClothesService) {
        this.userService = userService;
        this.productService = productService;
        this.categoryAccessoriesService = categoryAccessoriesService;
        this.categoryShoesService = categoryShoesService;
        this.categoryClothesService = categoryClothesService;
    }
    
    
    
    @GetMapping
    public ResponseEntity<?> printHello(){
        return new ResponseEntity<>("Hello this is project of group 2", HttpStatus.OK);
    } 

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginModel loginModel){
        try {
            UserModel userModel = userService.setLogin(loginModel);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Username or password incorrect");
            return new ResponseEntity<>(errorModel, HttpStatus.NOT_FOUND);
        }
        
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpModel signUpModel){
        try {
            UserModel userModel = userService.signUp(signUpModel);
            return new ResponseEntity<>(userModel, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Username is existed");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/authen")
    public ResponseEntity<?> printAuthen(){
        return new ResponseEntity<>("Page must login to see", HttpStatus.OK);
    }

    @GetMapping("/product")
    public ResponseEntity<?> getAllProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }
    

    @GetMapping("/product/categoryaccessories/{productid}")
    public ResponseEntity<?> getCategoryAccessoriesByProductId(@PathVariable("productid") int productId){
        try {
            CategoryAccessoriesModel categoryAccessoriesModel = categoryAccessoriesService.getCategoryAccessoriesByProductId(productId);
            return new ResponseEntity<>(categoryAccessoriesModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't get category accessories");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/categoryshoes/{productid}")
    public ResponseEntity<?> getCategoryShoesByProductId(@PathVariable("productid") int productId){
        try {
            CategoryShoesModel categoryShoesModel = categoryShoesService.getCategoryShoesByProductId(productId);
            return new ResponseEntity<>(categoryShoesModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't find category shoes");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/categoryclothes/{productid}")
    public ResponseEntity<?> getCategoryClothesByProductId(@PathVariable("productid") int productId){
        try {
            CategoryClothesModel categoryClothesModel = categoryClothesService.getCategoryClothesByProductId(productId);
            return new ResponseEntity<>(categoryClothesModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Can't find category clothes");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/category/{id}")
    public ResponseEntity<?> getAllProductsByCategory(@PathVariable("id") int categoryId){
        List<ProductModel> productModels = productService.getAllProductsByCategory(categoryId);
        return new ResponseEntity<>(productModels, HttpStatus.OK);
    }

    @GetMapping("/product/category/clothes/{type}")
    public ResponseEntity<?> getCategoryClothesByType(@PathVariable("type") String type){
        System.out.println("Go to getCategoryClothesByType");
        List<ProductModel> categoryClothesModels = categoryClothesService.getCategoryClothesByType(type);
        return new ResponseEntity<>(categoryClothesModels, HttpStatus.OK);
    }

    @GetMapping("/product/category/shoes/{style}")
    public ResponseEntity<?> getCategoryShoesByStyle(@PathVariable("style") String style){
        List<ProductModel> categoryShoesModels = categoryShoesService.getCategoryShoesByStyle(style);
        return new ResponseEntity<>(categoryShoesModels, HttpStatus.OK);
    }

    @GetMapping("/product/category/accessories/{type}")
    public ResponseEntity<?> getCategoryAccessoriesByType(@PathVariable("type") String type){
        List<ProductModel> categoryAccessoriesModels = categoryAccessoriesService.getCategoryAccessoriesByType(type);
        return new ResponseEntity<>(categoryAccessoriesModels, HttpStatus.OK);
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

    @GetMapping("/product/comment/{id}")
    public ResponseEntity<?> getCommentByProductId(@PathVariable("id") int productId){
        List<CommentModel> commentModels = userService.getCommentByProductId(productId);
        return new ResponseEntity<>(commentModels, HttpStatus.OK);
    }

}
