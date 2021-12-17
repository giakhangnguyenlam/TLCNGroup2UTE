package ute.tlcn.begroup2.Services.ShipperServices;

import java.util.List;

import ute.tlcn.begroup2.Models.ShipperModels.ShipperOrderModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;

public interface ShipperService {
    public UserModel signUpShipper(SignUpModel signUpModel) throws Exception;
    public List<ShipperOrderModel> getAllOrderWithAlreadyStatus();
    public void receiveOrder(int orderId, int shipperId);
    public List<ShipperOrderModel> getOrderByShipperId(int shipperId);
    public void deliveryOrder(int orderId, int shipperId);
    public List<ShipperOrderModel> getOrderDeliverySuccess(int shipperId);
}
