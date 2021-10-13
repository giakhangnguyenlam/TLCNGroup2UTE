package ute.tlcn.begroup2.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.ErrorModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.SellerServices.SellerService;
import ute.tlcn.begroup2.Services.SellerServices.StoreService;

@RestController
@RequestMapping("/seller")
@Slf4j
public class SellerController {
    
    private SellerService sellerService;
    private StoreService storeService;
    @Autowired
    public SellerController(SellerService sellerService, StoreService storeService) {
        this.sellerService = sellerService;
        this.storeService = storeService;
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
}
