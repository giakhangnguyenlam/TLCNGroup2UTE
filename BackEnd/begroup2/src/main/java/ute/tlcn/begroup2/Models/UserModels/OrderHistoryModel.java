package ute.tlcn.begroup2.Models.UserModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderHistoryModel {
    private int id;
    private int userId;
    private String orderDate;
    private double total;
    private String orderStatus;
    private String paymentStatus;
    private String product;
}
