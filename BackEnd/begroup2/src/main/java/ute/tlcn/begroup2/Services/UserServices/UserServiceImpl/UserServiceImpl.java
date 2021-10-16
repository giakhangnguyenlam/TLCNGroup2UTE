package ute.tlcn.begroup2.Services.UserServices.UserServiceImpl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserDetailsModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.UserMapper;
import ute.tlcn.begroup2.Repositories.UserRepository;
import ute.tlcn.begroup2.Services.UserServices.UserService;
import ute.tlcn.begroup2.Utils.JWTUtil;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private AuthenticationManager authenticationManager;
    private UserDetailsService userDetailsService;
    private JWTUtil jwtUtil;
    private UserRepository userRepository;
    private UserMapper userMapper;
    private DateMapper dateMapper;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JWTUtil jwtUtil, UserRepository userRepository, UserMapper userMapper, DateMapper dateMapper, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.dateMapper = dateMapper;
        this.passwordEncoder = passwordEncoder;
    }
    
    
    
    // login
    @Override
    public UserModel setLogin(LoginModel loginModel) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginModel.getUsername(),
                loginModel.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect Username or password", e);
        }
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginModel.getUsername());
        String jwt = jwtUtil.generationToken(userDetails);
        UserEntity userEntity = userRepository.getByUsername(loginModel.getUsername());
        UserModel userModel = userMapper.convertUserEntityToUserModel(userEntity);
        userModel.setJwt(jwt);
        return userModel;
    }

    // sign up
    @Override
    public UserModel signUp(SignUpModel signUpModel) throws Exception {
        if(isExistedUser(signUpModel.getUsername())){
            throw new Exception("User is already exited");
        }
        else{
            log.info("Create user" + signUpModel);
            Date dateOfBirth = dateMapper.convertStringToDate(signUpModel.getDateofbirth());
            UserEntity userEntity = new UserEntity(0, 
            signUpModel.getName(), 
            dateOfBirth, 
            signUpModel.getEmail(),
            signUpModel.getAddress(), 
            signUpModel.getGender(), 
            signUpModel.getUsername(), 
            passwordEncoder.encode(signUpModel.getPassword()), 
            "ROLE_USER");

            userEntity = userRepository.save(userEntity);
            UserDetailsModel userDetailsModel = new UserDetailsModel(userEntity);
            String jwt = jwtUtil.generationToken(userDetailsModel);
            UserModel userModel = userMapper.convertUserEntityToUserModel(userEntity);
            userModel.setJwt(jwt);
            return userModel;
        }
    }

    @Override
    public boolean isExistedUser(String username){
        return userRepository.existsByUsername(username);
    }



    @Override
    public UserModel updateUser(int id, SignUpModel signUpModel) throws Exception {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);
        if (optionalUserEntity.isPresent()) {
            UserEntity userEntity = optionalUserEntity.get();
            userEntity.setName(signUpModel.getName());
            userEntity.setGender(signUpModel.getGender());
            userEntity.setDateofbirth(dateMapper.convertStringToDate(signUpModel.getDateofbirth()));
            userEntity.setEmail(signUpModel.getEmail());
            userEntity.setAddress(signUpModel.getAddress());
            userEntity.setPassword(passwordEncoder.encode(signUpModel.getPassword()));

            userEntity = userRepository.save(userEntity);
            return userMapper.convertUserEntityToUserModel(userEntity);
        } else {
            throw new NotFoundException("Can't found user");
        }
        
    }



    @Override
    public UserModel getUserByUserName(String username) throws Exception {
        Optional<UserEntity> optionalUserEntity = userRepository.findByUsername(username);
        if (optionalUserEntity.isPresent()) {
            return userMapper.convertUserEntityToUserModel(optionalUserEntity.get());
        } else {
            throw new NotFoundException("Can't find user");
        }

    }



    @Override
    public UserModel getUserByUserId(int id) throws Exception {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);
        if (optionalUserEntity.isPresent()) {
            return userMapper.convertUserEntityToUserModel(optionalUserEntity.get());
        } else {
            throw new NotFoundException("Can't find user");
        }
    }
}
