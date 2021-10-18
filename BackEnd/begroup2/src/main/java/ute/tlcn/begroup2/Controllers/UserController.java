package ute.tlcn.begroup2.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.UserServices.UserService;

@RestController
@RequestMapping("/user")
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
    public ResponseEntity<?> updateUserWithPassword(@PathVariable("id") int id, @RequestBody SignUpModel signUpModel){
        try {
            UserModel userModel = userService.updateUserWithPassword(id, signUpModel);
            return new ResponseEntity<>(userModel, HttpStatus.OK);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel("User isn't existed");
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
}
