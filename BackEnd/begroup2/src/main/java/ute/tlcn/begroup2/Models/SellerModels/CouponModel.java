package ute.tlcn.begroup2.Models.SellerModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CouponModel {

    private int couponId;
    private int productId;
    private String couponName;
    private String couponDesc;
    private double discount;
    private long startDate;
    private long expireDate;
    
}
