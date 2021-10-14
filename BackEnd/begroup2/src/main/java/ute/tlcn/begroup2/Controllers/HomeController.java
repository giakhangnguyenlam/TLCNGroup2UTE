package ute.tlcn.begroup2.Controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.SellerServices.ProductService;
import ute.tlcn.begroup2.Services.UserServices.UserService;

@RestController
public class HomeController {

    private UserService userService;
    private ProductService productService;

    @Autowired
    public HomeController(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
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
    
}
