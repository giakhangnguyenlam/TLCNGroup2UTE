package ute.tlcn.begroup2.Models.UserModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailModel {
    private int id;
    private int orderId;
    private int productId;
    private int quantity;
    private String description;
    private String date;
    private String productName;
    private double price;
    private String status;
}