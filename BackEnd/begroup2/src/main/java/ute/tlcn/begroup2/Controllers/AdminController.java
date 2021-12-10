package ute.tlcn.begroup2.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.OrderModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.AdminServices.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {
    
    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    

    @GetMapping("/stores")
    public ResponseEntity<?> getAllStores(){
        List<StoreModel> storeModels = adminService.getAllStores();
        return new ResponseEntity<>(storeModels, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(){
        List<UserModel> userModels =  adminService.getAllUsers();
        return new ResponseEntity<>(userModels, HttpStatus.OK);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders(){
        List<OrderModel> orderModels = adminService.getAllOrders();
        return new ResponseEntity<>(orderModels, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(){
        List<ProductModel> productModels  = adminService.getAllProducts();
        return new ResponseEntity<>(productModels, HttpStatus.OK);
    }
}
