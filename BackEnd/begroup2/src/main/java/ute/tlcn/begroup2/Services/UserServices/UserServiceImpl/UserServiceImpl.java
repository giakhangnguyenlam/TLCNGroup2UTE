package ute.tlcn.begroup2.Services.UserServices.UserServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import ute.tlcn.begroup2.Entities.CommentEntity;
import ute.tlcn.begroup2.Entities.OrderDetailEntity;
import ute.tlcn.begroup2.Entities.OrderEntity;
import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.UserModels.CommentModel;
import ute.tlcn.begroup2.Models.UserModels.LoginModel;
import ute.tlcn.begroup2.Models.UserModels.OrderDetailModel;
import ute.tlcn.begroup2.Models.UserModels.OrderHistoryModel;
import ute.tlcn.begroup2.Models.UserModels.PassWordModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserDetailsModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.Models.UserModels.UserOrderModel;
import ute.tlcn.begroup2.ObjectMapper.CommentMapper;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderDetailMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderMapper;
import ute.tlcn.begroup2.ObjectMapper.UserMapper;
import ute.tlcn.begroup2.Repositories.CommentRepository;
import ute.tlcn.begroup2.Repositories.OrderDetailsRepository;
import ute.tlcn.begroup2.Repositories.OrderRepository;
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
    private OrderMapper orderMapper;
    private OrderDetailMapper orderDetailMapper;
    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private CommentMapper commentMapper;
    private CommentRepository commentRepository;

    @Autowired
    public UserServiceImpl(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JWTUtil jwtUtil, UserRepository userRepository, UserMapper userMapper, DateMapper dateMapper, PasswordEncoder passwordEncoder, OrderMapper orderMapper, OrderDetailMapper orderDetailMapper, OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, CommentMapper commentMapper, CommentRepository commentRepository) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.dateMapper = dateMapper;
        this.passwordEncoder = passwordEncoder;
        this.orderMapper = orderMapper;
        this.orderDetailMapper = orderDetailMapper;
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.commentMapper = commentMapper;
        this.commentRepository = commentRepository;
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
            "ROLE_USER",
            signUpModel.getPhone());

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
    public UserModel updateUserWithoutPassword(int id, SignUpModel signUpModel) throws Exception {
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
            UserDetailsModel userDetailsModel = new UserDetailsModel(userEntity);
            String jwt = jwtUtil.generationToken(userDetailsModel);
            UserModel userModel = userMapper.convertUserEntityToUserModel(userEntity);
            userModel.setJwt(jwt);
            return userModel;
        } else {
            throw new NotFoundException("Can't found user");
        }
        
    }

    @Override
    public UserModel updateUserWithPassword(int id, PassWordModel passWordModel) throws Exception {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);
        if(optionalUserEntity.isPresent()){
            UserEntity userEntity = optionalUserEntity.get();
            if(passwordEncoder.matches(passWordModel.getOldPassword(), userEntity.getPassword())){
            String password = passwordEncoder.encode(passWordModel.getPassword());
            userEntity.setPassword(password);
            userEntity = userRepository.save(userEntity);
            UserDetailsModel userDetailsModel = new UserDetailsModel(userEntity);
            String jwt = jwtUtil.generationToken(userDetailsModel);
            UserModel userModel = userMapper.convertUserEntityToUserModel(userEntity);
            userModel.setJwt(jwt);
            return userModel;
            }
            else{
                throw new NotFoundException("Old password is incorrect");
            }
            
        }
        else{
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



    @Override
    public void order(UserOrderModel userOrderModel) {
        userOrderModel = new UserOrderModel(userOrderModel.getUserId(), userOrderModel.getTotal(), userOrderModel.getListProducts(), userOrderModel.getListQuantities(), userOrderModel.getListDescription(), userOrderModel.getListProductNames(), userOrderModel.getListPrices());
        OrderEntity orderEntity = orderMapper.convertUserOrderModelToOrderEntity(userOrderModel);
        orderEntity = orderRepository.save(orderEntity);
        List<OrderDetailEntity> orderDetailEntities = orderDetailMapper.convertUserOrderModelToListOrderDetailEntity(orderEntity.getId(), userOrderModel.getListProducts(), userOrderModel.getListQuantities(), userOrderModel.getListDescription(), userOrderModel.getOrderDate(), userOrderModel.getListProductNames(), userOrderModel.getListPrices());
        orderDetailsRepository.saveAll(orderDetailEntities);
    }



    @Override
    public List<OrderHistoryModel> orderHistory(int userId) {
        List<OrderEntity> orderEntities = orderRepository.getByUserId(userId);
        List<OrderHistoryModel> orderHistoryModels = orderEntities.stream()
        .map((orderEntity) -> {
            List<OrderDetailEntity> orderDetailEntity = orderDetailsRepository.getByOrderId(orderEntity.getId());
            OrderHistoryModel orderHistoryModel = orderMapper.convertOrderEntityToOrderHistoryModel(orderEntity, orderDetailEntity.get(0).getProductName()+",...");
            return orderHistoryModel;
        })
        .collect(Collectors.toList());

        return orderHistoryModels;
    }



    @Override
    public List<OrderDetailModel> orderDetailsHistory(int orderId) {
        List<OrderDetailEntity> orderDetailEntities = orderDetailsRepository.getByOrderId(orderId);
        return orderDetailMapper.convertListOrderDetailEntityToListOrderDetailModel(orderDetailEntities);
    }

    @Override
    public void createComment(CommentModel commentModel) {
        log.info("go to service create comment");
        CommentEntity commentEntity = commentMapper.convertCommentModelToCommentEntity(commentModel);
        commentRepository.save(commentEntity);
    }


    @Override
    public List<CommentModel> getCommentByProductId(int productId) {
        List<CommentModel> commentModels = commentRepository.getByProductId(productId)
        .stream()
        .map((commentEntity) -> {
            return commentMapper.convertCommentEntityToCommentModel(commentEntity);
        })
        .collect(Collectors.toList());

        return commentModels;
    }


    @Override
    public void orderWithPaypal(UserOrderModel userOrderModel) {
        userOrderModel = new UserOrderModel(userOrderModel.getUserId(), userOrderModel.getTotal(), userOrderModel.getListProducts(), userOrderModel.getListQuantities(), userOrderModel.getListDescription(), userOrderModel.getListProductNames(), userOrderModel.getListPrices());
        userOrderModel.setPaymentStatus("Đã thanh toán");
        OrderEntity orderEntity = orderMapper.convertUserOrderModelToOrderEntity(userOrderModel);
        orderEntity = orderRepository.save(orderEntity);
        List<OrderDetailEntity> orderDetailEntities = orderDetailMapper.convertUserOrderModelToListOrderDetailEntity(orderEntity.getId(), userOrderModel.getListProducts(), userOrderModel.getListQuantities(), userOrderModel.getListDescription(), userOrderModel.getOrderDate(), userOrderModel.getListProductNames(), userOrderModel.getListPrices());
        orderDetailsRepository.saveAll(orderDetailEntities);
        
    }
}
