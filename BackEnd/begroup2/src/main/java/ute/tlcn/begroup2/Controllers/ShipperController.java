package ute.tlcn.begroup2.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ute.tlcn.begroup2.Models.SellerModels.MessageModel;
import ute.tlcn.begroup2.Models.ShipperModels.ShipperOrderModel;
import ute.tlcn.begroup2.Models.ShipperModels.ShipperReceiveModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Services.ShipperServices.ShipperService;


@RestController
@RequestMapping("/shipper")
public class ShipperController {
    
    private ShipperService shipperService;

    @Autowired
    public ShipperController(ShipperService shipperService) {
        this.shipperService = shipperService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUpShipper(@RequestBody SignUpModel signUpModel) {
        try {
            UserModel userModel = shipperService.signUpShipper(signUpModel);
            return new ResponseEntity<>(userModel, HttpStatus.CREATED);
        } catch (Exception e) {
            MessageModel messageModel = new MessageModel("Username is existed");
            return new ResponseEntity<>(messageModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllOrderWithAlreadyStatus() {
        List<ShipperOrderModel> shipperOrderModels = shipperService.getAllOrderWithAlreadyStatus();
        if(shipperOrderModels.isEmpty()){
            MessageModel messageModel = new MessageModel("Order isn't already to delivery");
            return new ResponseEntity<>(messageModel, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(shipperOrderModels, HttpStatus.OK);
        }
    }

    @PostMapping("/receiveorder")
    public ResponseEntity<?> receiveOrder(@RequestBody ShipperReceiveModel shipperReceiveModel){
        try {
            shipperService.receiveOrder(shipperReceiveModel.getOrderId(), shipperReceiveModel.getShipperId());
            MessageModel messageModel = new MessageModel("Nhận đơn hàng thành công");
            return new ResponseEntity<>(messageModel, HttpStatus.CREATED);
        } catch (Exception e) {
            MessageModel messageModel = new MessageModel("Nhận đơn hàng thất bại");
            return new ResponseEntity<>(messageModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrderByShipperId(@PathVariable("id") int shipperId){
        List<ShipperOrderModel> shipperOrderModels  = shipperService.getOrderByShipperId(shipperId);
        if(shipperOrderModels.isEmpty()){
            MessageModel messageModel =  new MessageModel("Chưa nhận đơn hàng");
            return new ResponseEntity<>(messageModel, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(shipperOrderModels, HttpStatus.OK);
        }
    }

    @PostMapping("/deliveryorder")
    public ResponseEntity<?> deliveryOrder(@RequestBody ShipperReceiveModel shipperReceiveModel){
        try {
            shipperService.deliveryOrder(shipperReceiveModel.getOrderId(), shipperReceiveModel.getShipperId());
            MessageModel messageModel = new MessageModel("Giao hàng thành công");
            return new ResponseEntity<>(messageModel, HttpStatus.CREATED);
        } catch (Exception e) {
            MessageModel messageModel = new MessageModel("Giao hàng không thành công");
            return new ResponseEntity<>(messageModel, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/ordersuccess/{id}")
    public ResponseEntity<?> getOrderDeliverySuccess(@PathVariable("id") int shipperId){
        List<ShipperOrderModel> shipperOrderModels =  shipperService.getOrderDeliverySuccess(shipperId);
        if (shipperOrderModels.isEmpty()) {
            MessageModel messageModel = new MessageModel("Chưa có đơn hàng được giao");
            return new ResponseEntity<>(messageModel, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(shipperOrderModels, HttpStatus.OK);
        }
    }
    
}
