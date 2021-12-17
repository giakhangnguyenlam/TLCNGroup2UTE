package ute.tlcn.begroup2.Models.ShipperModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShipperOrderModel {
    private int orderId;
    private String name;
    private String address;
    private String phone;
    private String description;
    private double total;
}
