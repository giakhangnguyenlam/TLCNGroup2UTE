package ute.tlcn.begroup2.Services.UserServices;

import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;

public interface UserService {
    
    public UserModel setLogin(LoginModel loginModel) throws Exception;
    public UserModel signUp(SignUpModel signUpModel) throws Exception;
    public boolean isExistedUser(String username);
}
