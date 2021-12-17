package ute.tlcn.begroup2.Models.SellerModels;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryClothesModel {
    private int id;
    private String type;
    private String brand;
    private String origin;
    private List<String> size;
    private List<String> color;
    private String material;
    private String gender;
    private int productId;
}
