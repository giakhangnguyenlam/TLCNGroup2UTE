package ute.tlcn.begroup2.Models.UserModels;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserOrderModel {
    private static final Date DEFAULT_ORDER_DATE = new Date();
    private static final String DEFAULT_ORDER_STATUS = "Đặt hàng thành công";
    private static final String DEFAULT_PAYMENT_STATUS = "chưa thanh toán";

    private int userId;
    private Date orderDate;
    private double total;
    private String orderStatus;
    private String paymentStatus;
    private List<Integer> listProducts;
    private List<Integer> listQuantities;
    private List<String> listDescription;
    private List<String> listProductNames;
    private List<Double> listPrices;
    
    public UserOrderModel(int userId, double total, List<Integer> listProducts, List<Integer> listQuantities, List<String> listDescription, List<String> listProductNames, List<Double> listPrices) {
        this(userId, DEFAULT_ORDER_DATE, total, DEFAULT_ORDER_STATUS, DEFAULT_PAYMENT_STATUS, listProducts, listQuantities, listDescription, listProductNames, listPrices);
    }

}
