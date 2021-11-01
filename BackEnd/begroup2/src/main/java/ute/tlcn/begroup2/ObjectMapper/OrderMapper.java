package ute.tlcn.begroup2.ObjectMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.OrderEntity;
import ute.tlcn.begroup2.Models.UserModels.OrderModel;
import ute.tlcn.begroup2.Models.UserModels.UserOrderModel;

@Component
public class OrderMapper {

    private DateMapper dateMapper;

    @Autowired
    public OrderMapper(DateMapper dateMapper) {
        this.dateMapper = dateMapper;
    }


    public OrderEntity convertUserOrderModelToOrderEntity(UserOrderModel userOrderModel){
        OrderEntity orderEntity = new OrderEntity(0, 
        userOrderModel.getUserId(), 
        userOrderModel.getOrderDate(), 
        userOrderModel.getTotal(),
        userOrderModel.getOrderStatus(), 
        userOrderModel.getPaymentStatus());

        return orderEntity;
    }

    public OrderModel convertOrderEntityToOrderModel(OrderEntity orderEntity){
        OrderModel orderModel = new OrderModel(orderEntity.getId(), 
        orderEntity.getUserId(), 
        dateMapper.convertDateToString(orderEntity.getOrderDate()), 
        orderEntity.getTotal(), 
       orderEntity.getOrderStatus(), 
       orderEntity.getPaymentStatus());

       return orderModel;
    }

    public List<OrderModel> convertListOrderEntityToListOrderModel(List<OrderEntity> orderEntities){
        List<OrderModel> orderModels = orderEntities.stream()
        .map((orderEntity) -> {
            return convertOrderEntityToOrderModel(orderEntity);
        })
        .collect(Collectors.toList());

       return orderModels;
    }
    
}
