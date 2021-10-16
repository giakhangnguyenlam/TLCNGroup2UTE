package ute.tlcn.begroup2.Models.SellerModels;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryAccessoriesModel {
    private int id;
    private String type;
    private List<String> color;
    private String brand;
    private String origin;
    private List<String> size;
    private String material;
    private int productId;
}