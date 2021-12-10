package ute.tlcn.begroup2.Services.AdminServices;

import java.util.List;

import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.OrderModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;

public interface AdminService {
    public UserModel loginAdmin(LoginModel loginModel) throws Exception;
    public UserModel signUpAdmin(SignUpModel signUpModel) throws Exception;
    public List<StoreModel> getAllStores();
    public List<UserModel> getAllUsers();
    public List<OrderModel> getAllOrders();
    public List<ProductModel> getAllProducts();
}
