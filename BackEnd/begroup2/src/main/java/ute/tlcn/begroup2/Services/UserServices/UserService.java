package ute.tlcn.begroup2.Services.UserServices;

import java.util.List;

import ute.tlcn.begroup2.Models.UserModels.*;

public interface UserService {
    
    public UserModel setLogin(LoginModel loginModel) throws Exception;
    public UserModel signUp(SignUpModel signUpModel) throws Exception;
    public boolean isExistedUser(String username);
    public UserModel updateUserWithoutPassword(int id, SignUpModel signUpModel) throws Exception;
    public UserModel updateUserWithPassword(int id, PassWordModel passWordModel) throws Exception;
    public UserModel getUserByUserName(String username) throws Exception;
    public UserModel getUserByUserId(int id) throws Exception;
    public void order(UserOrderModel userOrderModel);
    public void orderWithPaypal(UserOrderModel userOrderModel);
    public List<OrderHistoryModel> orderHistory(int userId);
    public List<OrderDetailModel> orderDetailsHistory(int orderId);
    public void createComment(CommentModel commentModel);
    public List<CommentModel> getCommentByProductId(int productId);
    public List<String> getAllNameProduct();
    public List<SuggestionProductsModel> getSuggestionProducts(String name);
}
