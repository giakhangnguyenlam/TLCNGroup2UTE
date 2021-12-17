package ute.tlcn.begroup2.Models.SellerModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {
    public int id;
    public int storeId;
    public int category;
    public String name;
    public int quantity;
    public double price;
    public String description;
    public String image;
}
