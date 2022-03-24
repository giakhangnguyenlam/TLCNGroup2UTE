package ute.tlcn.begroup2.Models.UserModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SuggestionProductsModel {
    private int storeId;
    private String storeName;
    private String image;
    private int productId;
    private String name;
    private double price;
}
