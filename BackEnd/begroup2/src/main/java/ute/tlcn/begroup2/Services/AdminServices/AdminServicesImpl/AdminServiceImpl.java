package ute.tlcn.begroup2.Services.AdminServices.AdminServicesImpl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import ute.tlcn.begroup2.Entities.OrderEntity;
import ute.tlcn.begroup2.Entities.ProductEntity;
import ute.tlcn.begroup2.Entities.StoreEntity;
import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.SellerModels.ProductModel;
import ute.tlcn.begroup2.Models.SellerModels.StoreModel;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.OrderModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserDetailsModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderMapper;
import ute.tlcn.begroup2.ObjectMapper.ProductMapper;
import ute.tlcn.begroup2.ObjectMapper.StoreMapper;
import ute.tlcn.begroup2.ObjectMapper.UserMapper;
import ute.tlcn.begroup2.Repositories.OrderRepository;
import ute.tlcn.begroup2.Repositories.ProductRepository;
import ute.tlcn.begroup2.Repositories.StoreRepository;
import ute.tlcn.begroup2.Repositories.UserRepository;
import ute.tlcn.begroup2.Services.AdminServices.AdminService;
import ute.tlcn.begroup2.Utils.JWTUtil;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {

    private AuthenticationManager authenticationManager;
    private UserDetailsService userDetailsService;
    private JWTUtil jwtUtil;
    private UserRepository userRepository;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    private DateMapper dateMapper;
    private StoreRepository storeRepository;
    private StoreMapper storeMapper;
    private OrderRepository orderRepository;
    private OrderMapper orderMapper;
    private ProductRepository productRepository;
    private ProductMapper productMapper;

    @Autowired
    public AdminServiceImpl(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JWTUtil jwtUtil, UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, DateMapper dateMapper, StoreRepository storeRepository, StoreMapper storeMapper, OrderRepository orderRepository, OrderMapper orderMapper, ProductRepository productRepository, ProductMapper productMapper) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.dateMapper = dateMapper;
        this.storeRepository = storeRepository;
        this.storeMapper = storeMapper;
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }
    
    

    @Override
    public UserModel loginAdmin(LoginModel loginModel) throws Exception {
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

    @Override
    public List<StoreModel> getAllStores() {
        List<StoreEntity> storeEntities = storeRepository.findAll();
        List<StoreModel> storeModels = storeEntities.stream()
        .map(storeEntity -> {
            return storeMapper.convertStoreEntityStoreModel(storeEntity);
        })
        .collect(Collectors.toList());

        return storeModels;
    }

    @Override
    public List<UserModel> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<UserModel> userModels = userEntities.stream()
        .map(userEntity -> {
            return userMapper.convertUserEntityToUserModel(userEntity);
        })
        .collect(Collectors.toList());

        return userModels;
    }

    @Override
    public List<OrderModel> getAllOrders() {
        List<OrderEntity> orderEntities = orderRepository.findAll();
        List<OrderModel> orderModels = orderMapper.convertListOrderEntityToListOrderModel(orderEntities);
        return orderModels;
    }

    @Override
    public List<ProductModel> getAllProducts() {
        List<ProductEntity> productEntities = productRepository.findAll();
        List<ProductModel> productModels = productMapper.convertListProductEntityToListProductModel(productEntities);
        return productModels;
    }

    @Override
    public UserModel signUpAdmin(SignUpModel signUpModel) throws Exception {
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
            "ROLE_ADMIN",
            signUpModel.getPhone());

            userEntity = userRepository.save(userEntity);
            UserDetailsModel userDetailsModel = new UserDetailsModel(userEntity);
            String jwt = jwtUtil.generationToken(userDetailsModel);
            UserModel userModel = userMapper.convertUserEntityToUserModel(userEntity);
            userModel.setJwt(jwt);
            return userModel;
        }
    }

    public boolean isExistedUser(String username){
        return userRepository.existsByUsername(username);
    }
    
}
