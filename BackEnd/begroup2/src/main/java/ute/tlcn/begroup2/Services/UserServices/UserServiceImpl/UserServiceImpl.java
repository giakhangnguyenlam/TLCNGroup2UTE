package ute.tlcn.begroup2.Services.UserServices.UserServiceImpl;

import java.util.*;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

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
import ute.tlcn.begroup2.Entities.*;
import ute.tlcn.begroup2.Models.UserModels.*;
import ute.tlcn.begroup2.ObjectMapper.CommentMapper;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderDetailMapper;
import ute.tlcn.begroup2.ObjectMapper.OrderMapper;
import ute.tlcn.begroup2.ObjectMapper.UserMapper;
import ute.tlcn.begroup2.Repositories.*;
import ute.tlcn.begroup2.Services.MailServices.MailService;
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
    private MailService  mailService;
    private ProductRepository productRepository;
    private StoreRepository storeRepository;

    @Autowired
    public UserServiceImpl(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JWTUtil jwtUtil, UserRepository userRepository, UserMapper userMapper, DateMapper dateMapper, PasswordEncoder passwordEncoder, OrderMapper orderMapper, OrderDetailMapper orderDetailMapper, OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, CommentMapper commentMapper, CommentRepository commentRepository, MailService mailService, ProductRepository productRepository, StoreRepository storeRepository) {
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
        this.mailService = mailService;
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
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
            userEntity.setPhone(signUpModel.getPhone());

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
        OrderHistoryModel orderHistoryModel = orderMapper.convertOrderEntityToOrderHistoryModel(orderEntity, orderDetailEntities.get(0).getProductName()+",...");
        try {
            mailService.sendMail(orderHistoryModel, userOrderModel.getUserId());
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
        }
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
    public List<String> getAllNameProduct() {
        List<String> productNames = productRepository.findAll()
                .stream()
                .map(ProductEntity::getName)
                .distinct()
                .collect(Collectors.toList());

        return  productNames;
    }

    @Override
    public List<SuggestionProductsModel> getSuggestionProducts(String name) {
        List<ProductEntity> productEntities = productRepository.getAllByName(name);
        List<SuggestionProductsModel> suggestionProductsModels = productEntities.stream()
                .map(productEntity -> {
            return new SuggestionProductsModel(0,"","", productEntity.getId(), productEntity.getName(), productEntity.getPrice());
        }).collect(Collectors.toList());

        List<StoreEntity> storeEntities = productEntities.stream()
                .map(productEntity -> storeRepository.getById(productEntity.getStoreId()))
                .collect(Collectors.toList());;
        List<SuggestionProductsModel> result = new ArrayList<>();
        for (int i = 0; i < storeEntities.size(); i++) {
            StoreEntity storeEntity = storeEntities.get(i);
            SuggestionProductsModel suggestionProductsModel = suggestionProductsModels.get(i);
            suggestionProductsModel.setStoreId(storeEntity.getId());
            suggestionProductsModel.setStoreName(storeEntity.getNameStore());
            suggestionProductsModel.setImage(storeEntity.getImage());
            result.add(suggestionProductsModel);
        }
        return  result;
    }

    @Override
    public UserModel guestSignup(GuestSignupModel guestSignupModel) throws Exception {
        Optional<UserEntity> optionalUserEntity = userRepository.findByPhone(guestSignupModel.getPhone());
        if(optionalUserEntity.isPresent()){
            UserDetailsModel userDetailsModel = new UserDetailsModel(optionalUserEntity.get());
            String jwt = jwtUtil.generationToken(userDetailsModel);
            UserModel userModel = userMapper.convertUserEntityToUserModel(optionalUserEntity.get());
            userModel.setJwt(jwt);
            return userModel;
        }
        SignUpModel signUpModel = new SignUpModel(guestSignupModel.getName(),
                "03-04-2022",
                "laptrinhweb77@gmail.com",
                guestSignupModel.getAddress(),
                "male",
                "guestusername",
                "123",
                guestSignupModel.getPhone());
        return signUp(signUpModel);
    }

    @Override
    public void resetPassword(String username) throws Exception {
        Optional<UserEntity> optionalUserEntity = userRepository.findByUsername(username);
        if(optionalUserEntity.isPresent()){
            UserEntity userEntity = optionalUserEntity.get();
            String password = generatePassword();
            userEntity.setPassword(passwordEncoder.encode(password));
            userRepository.save(userEntity);
            try {
                mailService.sendMailWithPassword(password, userEntity.getId());
            }
            catch (Exception e){
                throw new Exception(e);
            }
        }
        else {
            throw new Exception("fail to reset password");
        }
    }

    private String generatePassword(){
        String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String specialCharacters = "!@#$";
        String numbers = "1234567890";
        String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
        Random random = new Random();
        char[] password = new char[9];

        password[0] = lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length()));
        password[1] = capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length()));
        password[2] = specialCharacters.charAt(random.nextInt(specialCharacters.length()));
        password[3] = numbers.charAt(random.nextInt(numbers.length()));

        for(int i = 4; i< 9; i++) {
            password[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
        }
        return new String(password);
    }


    @Override
    public void orderWithPaypal(UserOrderModel userOrderModel) {
        userOrderModel = new UserOrderModel(userOrderModel.getUserId(), userOrderModel.getTotal(), userOrderModel.getListProducts(), userOrderModel.getListQuantities(), userOrderModel.getListDescription(), userOrderModel.getListProductNames(), userOrderModel.getListPrices());
        userOrderModel.setPaymentStatus("Đã thanh toán");
        OrderEntity orderEntity = orderMapper.convertUserOrderModelToOrderEntity(userOrderModel);
        orderEntity = orderRepository.save(orderEntity);
        List<OrderDetailEntity> orderDetailEntities = orderDetailMapper.convertUserOrderModelToListOrderDetailEntity(orderEntity.getId(), userOrderModel.getListProducts(), userOrderModel.getListQuantities(), userOrderModel.getListDescription(), userOrderModel.getOrderDate(), userOrderModel.getListProductNames(), userOrderModel.getListPrices());
        orderDetailsRepository.saveAll(orderDetailEntities);
        OrderHistoryModel orderHistoryModel = orderMapper.convertOrderEntityToOrderHistoryModel(orderEntity, orderDetailEntities.get(0).getProductName()+",...");
        try {
            mailService.sendMail(orderHistoryModel, userOrderModel.getUserId());
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
        }
    }


}
