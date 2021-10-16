package ute.tlcn.begroup2.Entities;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "category_clothes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryClothesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    /**
     * Some type of clothes:
     * áo
     * quần
     * áo clb
     */
    private String type;
    private String brand;
    private String origin;
    @ElementCollection(targetClass = String.class)
    private List<String> size;
    @ElementCollection(targetClass = String.class)
    private List<String> color;
    private String material;
    private String gender;
    private int productId;
}
