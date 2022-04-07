package ute.tlcn.begroup2.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import ute.tlcn.begroup2.Models.UserModels.*;
import ute.tlcn.begroup2.Services.UserServices.UserService;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    

    //update user without password
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") int id, @RequestBody SignUpModel signUpModel){
        try {
            UserModel userModel = userService.updateUserWithoutPassword(id, signUpModel);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("User isn't existed");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/password/{id}")
    public ResponseEntity<?> updateUserWithPassword(@PathVariable("id") int id, @RequestBody PassWordModel passWordModel){
        try {
            UserModel userModel = userService.updateUserWithPassword(id, passWordModel);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Old password isn't correct");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserByUserId(@PathVariable("id") int id){
        try {
            UserModel userModel = userService.getUserByUserId(id);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("User isn't existed");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<?> getUserByUserName(@PathVariable("username") String username){
        try {
            UserModel userModel = userService.getUserByUserName(username);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("User isn't existed");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/order")
    public ResponseEntity<?> createOrder(@RequestBody UserOrderModel userOrderModel){
        try {
            log.info("Go to create order");
            userService.order(userOrderModel);
            return new ResponseEntity<>(new String("Order is created"), HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Order fail");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    } 

    @PostMapping("/orderwithpaypal")
    public ResponseEntity<?> createOrderWithPaypal(@RequestBody UserOrderModel userOrderModel){
        try {
            log.info("Go to create order with paypal");
            userService.orderWithPaypal(userOrderModel);
            return new ResponseEntity<>(new String("Order is created"), HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Order fail");
            return new ResponseEntity<>(errorModel, HttpStatus.BAD_REQUEST);
        }
    } 

    @GetMapping("/orderhistory/{id}")
    public ResponseEntity<?> getHistoryByUserId(@PathVariable("id") int id){
        List<OrderHistoryModel> orderModels = userService.orderHistory(id);
        return new ResponseEntity<>(orderModels, HttpStatus.OK);
    }

    @GetMapping("/orderdetailhistory/{id}")
    public ResponseEntity<?> getOrderDetailHistoryByOrderId(@PathVariable("id") int id){
        List<OrderDetailModel> orderDetailModels = userService.orderDetailsHistory(id);
        return new ResponseEntity<>(orderDetailModels, HttpStatus.OK);
    }

    @PostMapping("/comment")
    public ResponseEntity<?> createComment(@RequestBody CommentModel commentModel){
        try {
            userService.createComment(commentModel);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("Create comment successfully");
            return new ResponseEntity<>(errorModel, HttpStatus.CREATED);
        }
        
    }

}
