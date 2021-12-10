package ute.tlcn.begroup2.Services.SellerServices.SellerServicesImpl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserDetailsModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.UserMapper;
import ute.tlcn.begroup2.Repositories.UserRepository;
import ute.tlcn.begroup2.Services.SellerServices.SellerService;
import ute.tlcn.begroup2.Services.UserServices.UserService;
import ute.tlcn.begroup2.Utils.JWTUtil;

@Service
public class SellerServiceImpl implements SellerService {

    private UserService userService;
    private JWTUtil jwtUtil;
    private UserRepository userRepository;
    private UserMapper userMapper;
    private DateMapper dateMapper;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public SellerServiceImpl(UserService userService, JWTUtil jwtUtil, UserRepository userRepository, UserMapper userMapper, DateMapper dateMapper, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.dateMapper = dateMapper;
        this.passwordEncoder = passwordEncoder;
    }
    
    

    @Override
    public UserModel signUp(SignUpModel signUpModel) throws Exception {
        if(userService.isExistedUser(signUpModel.getUsername())){
            throw new Exception("User is already exited");
        }
        else{
            Date dateOfBirth = dateMapper.convertStringToDate(signUpModel.getDateofbirth());
            UserEntity userEntity = new UserEntity(0, 
            signUpModel.getName(), 
            dateOfBirth, 
            signUpModel.getEmail(),
            signUpModel.getAddress(), 
            signUpModel.getGender(), 
            signUpModel.getUsername(), 
            passwordEncoder.encode(signUpModel.getPassword()), 
            "ROLE_SELLER",
            signUpModel.getPhone());

            userEntity = userRepository.save(userEntity);
            UserDetailsModel userDetailsModel = new UserDetailsModel(userEntity);
            String jwt = jwtUtil.generationToken(userDetailsModel);
            UserModel userModel = userMapper.convertUserEntityToUserModel(userEntity);
            userModel.setJwt(jwt);
            return userModel;
        }
    }


    
}
