package ute.tlcn.begroup2.Models.SellerModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoreModel {
    private int id;
    private int userId;
    private String nameStore;
    private String storeDescription;
    private String image;
}
