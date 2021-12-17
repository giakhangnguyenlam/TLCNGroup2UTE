package ute.tlcn.begroup2.Services.SellerServices;

import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;

public interface SellerService {
    public UserModel signUp(SignUpModel signUpModel) throws Exception;
}
