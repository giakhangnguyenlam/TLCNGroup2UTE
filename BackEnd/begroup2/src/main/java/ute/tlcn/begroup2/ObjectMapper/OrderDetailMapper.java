package ute.tlcn.begroup2.ObjectMapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import ute.tlcn.begroup2.Entities.OrderDetailEntity;
import ute.tlcn.begroup2.Models.UserModels.OrderDetailModel;

@Component
@Slf4j
public class OrderDetailMapper {

    private DateMapper dateMapper;

    @Autowired
    public OrderDetailMapper(DateMapper dateMapper) {
        this.dateMapper = dateMapper;
    }


    public List<OrderDetailEntity> convertUserOrderModelToListOrderDetailEntity(int orderId, List<Integer> listProductId, List<Integer> listQuantities, List<String> listDescription, Date date){
        List<OrderDetailEntity> listOrderDetailEntities = new ArrayList<>();
        
        for (int i = 0; i < listProductId.size(); i++) {
            OrderDetailEntity orderDetailEntity = new OrderDetailEntity(0, 
            orderId, 
            listProductId.get(i), 
            listQuantities.get(i), 
            listDescription.get(i), 
            dateMapper.convertDateToString(date));

            listOrderDetailEntities.add(orderDetailEntity);
        }
        log.info("List Order Detail Entities: " + listOrderDetailEntities);

        return listOrderDetailEntities;
    } 

    public OrderDetailModel convertOrderDetailEntityToOrderDetailModel(OrderDetailEntity orderDetailEntity){
        OrderDetailModel orderDetailModel = new OrderDetailModel(orderDetailEntity.getId(), 
        orderDetailEntity.getOrderId(), 
        orderDetailEntity.getProductId(), 
        orderDetailEntity.getQuantity(), 
        orderDetailEntity.getDescription(),
        orderDetailEntity.getDate());

        return orderDetailModel;
    }
    
    public  List<OrderDetailModel> convertListOrderDetailEntityToListOrderDetailModel(List<OrderDetailEntity> orderDetailEntities){
        List<OrderDetailModel> orderDetailModels = orderDetailEntities.stream()
        .map((orderDetailEntity) -> {
            return convertOrderDetailEntityToOrderDetailModel(orderDetailEntity);
        })
        .collect(Collectors.toList());

        return orderDetailModels;
    }

}