package ute.tlcn.begroup2.Controllers;



import java.io.File;
import java.io.IOException;
import java.net.URLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.GoogleServices.GoogleService;
import ute.tlcn.begroup2.Services.UserServices.UserService;

@RestController
public class HomeController {

    private UserService userService;
    private GoogleService googleService;


    @Autowired
    public HomeController(UserService userService, GoogleService googleService) {
        this.userService = userService;
        this.googleService = googleService;
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

    // @PostMapping("/uploadgoogle")
    // public ResponseEntity<?> uploadGoogle(@RequestParam("file") MultipartFile multifile){
    //     File file1 = new File("C:\\Users\\Khang\\Pictures\\Saved Pictures\\"+multifile.getOriginalFilename());
    //     try {
    //         multifile.transferTo(file1);
    //         System.out.println("Mine type:" + URLConnection.guessContentTypeFromName(file1.getName()));
    //         com.google.api.services.drive.model.File file = googleService.uploadFile(file1.getName(), file1.getAbsolutePath(), URLConnection.guessContentTypeFromName(file1.getName()));
    //         return new ResponseEntity<>(file.getWebContentLink(), HttpStatus.CREATED);
    //     }
    //     catch (IOException e) {
    //         e.printStackTrace();
    //     }
        
    //     return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);

    // }
}
