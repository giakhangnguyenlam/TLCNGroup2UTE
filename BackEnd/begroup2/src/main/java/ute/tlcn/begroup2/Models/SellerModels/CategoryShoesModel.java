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
public class CategoryShoesModel {
    private int id;
    private String style;
    private List<String> size;
    private List<Double> color;
    private double height;
    private double weight;
    private String material;
    private String sole;
    private String origin;
    private double warranty;
    private String gender;
    private int productId;
}
