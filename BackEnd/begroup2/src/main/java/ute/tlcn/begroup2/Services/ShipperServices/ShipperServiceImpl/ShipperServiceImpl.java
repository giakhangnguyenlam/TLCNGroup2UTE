package ute.tlcn.begroup2.Services.ShipperServices.ShipperServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ute.tlcn.begroup2.Entities.OrderDetailEntity;
import ute.tlcn.begroup2.Entities.OrderEntity;
import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.ShipperModels.ShipperOrderModel;
import ute.tlcn.begroup2.Models.UserModels.SignUpModel;
import ute.tlcn.begroup2.Models.UserModels.UserDetailsModel;
import ute.tlcn.begroup2.Models.UserModels.UserModel;
import ute.tlcn.begroup2.ObjectMapper.DateMapper;
import ute.tlcn.begroup2.ObjectMapper.UserMapper;
import ute.tlcn.begroup2.Repositories.OrderDetailsRepository;
import ute.tlcn.begroup2.Repositories.OrderRepository;
import ute.tlcn.begroup2.Repositories.UserRepository;
import ute.tlcn.begroup2.Services.ShipperServices.ShipperService;
import ute.tlcn.begroup2.Services.UserServices.UserService;
import ute.tlcn.begroup2.Utils.JWTUtil;

@Service
public class ShipperServiceImpl implements ShipperService {

    private UserService userService;
    private JWTUtil jwtUtil;
    private UserRepository userRepository;
    private UserMapper userMapper;
    private DateMapper dateMapper;
    private PasswordEncoder passwordEncoder;
    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public ShipperServiceImpl(UserService userService, JWTUtil jwtUtil, UserRepository userRepository, UserMapper userMapper, DateMapper dateMapper, PasswordEncoder passwordEncoder, OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.dateMapper = dateMapper;
        this.passwordEncoder = passwordEncoder;
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    


    @Override
    public UserModel signUpShipper(SignUpModel signUpModel) throws Exception{
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
            "ROLE_SHIPPER",
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
    public List<ShipperOrderModel> getAllOrderWithAlreadyStatus() {
        List<OrderEntity> orderEntities = orderRepository.getByOrderStatus("Đơn hàng đã chuẩn bị xong");
        List<ShipperOrderModel> shipperOrderModels = orderEntities.stream()
        .map(orderEntity -> {
        UserEntity userEntity = userRepository.getById(orderEntity.getUserId());
        List<OrderDetailEntity> orderDetailEntities  = orderDetailsRepository.getByOrderId(orderEntity.getId());
        String description = "";
        for (OrderDetailEntity orderDetailEntity : orderDetailEntities) {
        description += orderDetailEntity.getProductName()+"X"+orderDetailEntity.getQuantity()+", ";
        }
        description = description.substring(0, description.length()-2);
        ShipperOrderModel shipperOrderModel = new ShipperOrderModel(orderEntity.getId(), userEntity.getName(), userEntity.getAddress(), userEntity.getPhone(), description, orderEntity.getTotal());
        return shipperOrderModel;
        }).collect(Collectors.toList());
        return shipperOrderModels;
 
    }

    @Override
    public void receiveOrder(int orderId, int shipperId) {
        OrderEntity orderEntity = orderRepository.getById(orderId);
        orderEntity.setOrderStatus("Đang giao hàng");
        orderEntity.setShipperId(shipperId);
        orderRepository.save(orderEntity);
    }

    @Override
    public List<ShipperOrderModel> getOrderByShipperId(int shipperId) {
        List<OrderEntity> orderEntities = orderRepository.getByOrderStatusAndShipperId("Đang giao hàng", shipperId);
        List<ShipperOrderModel> shipperOrderModels = orderEntities.stream()
        .map(orderEntity -> {
            UserEntity userEntity = userRepository.getById(orderEntity.getUserId());
            List<OrderDetailEntity> orderDetailEntities  = orderDetailsRepository.getByOrderId(orderEntity.getId());
            String description = "";
            for (OrderDetailEntity orderDetailEntity : orderDetailEntities) {
                description += orderDetailEntity.getProductName()+"X"+orderDetailEntity.getQuantity()+", ";
            }
            description = description.substring(0, description.length()-2);
            ShipperOrderModel shipperOrderModel = new ShipperOrderModel(orderEntity.getId(), userEntity.getName(), userEntity.getAddress(), userEntity.getPhone(), description, orderEntity.getTotal());
            return shipperOrderModel;
        }).collect(Collectors.toList());

        return shipperOrderModels;
    }

    @Override
    public void deliveryOrder(int orderId, int shipperId) {
        OrderEntity orderEntity = orderRepository.getById(orderId);
        orderEntity.setPaymentStatus("Đã thanh toán");
        orderEntity.setOrderStatus("Giao hàng thành công");
        orderRepository.save(orderEntity);
    }

    @Override
    public List<ShipperOrderModel> getOrderDeliverySuccess(int shipperId) {
        List<OrderEntity> orderEntities = orderRepository.getByOrderStatusAndShipperId("Giao hàng thành công", shipperId);
        List<ShipperOrderModel> shipperOrderModels = orderEntities.stream()
        .map(orderEntity -> {
            UserEntity userEntity = userRepository.getById(orderEntity.getUserId());
            List<OrderDetailEntity> orderDetailEntities  = orderDetailsRepository.getByOrderId(orderEntity.getId());
            String description = "";
            for (OrderDetailEntity orderDetailEntity : orderDetailEntities) {
                description += orderDetailEntity.getProductName()+"X"+orderDetailEntity.getQuantity()+", ";
            }
            description = description.substring(0, description.length()-2);
            ShipperOrderModel shipperOrderModel = new ShipperOrderModel(orderEntity.getId(), userEntity.getName(), userEntity.getAddress(), userEntity.getPhone(), description, orderEntity.getTotal());
            return shipperOrderModel;
        }).collect(Collectors.toList());

        return shipperOrderModels;
    }
    
}
