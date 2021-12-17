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
@Table(name = "category_shoes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryShoesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    /**
     * Some of styles:
     * 1: đá bóng
     * 2: chạy bộ
     * 3: bóng rổ
     * 4: cầu lông
     */
    private String style;
    @ElementCollection(targetClass = String.class)
    private List<String> size;
    @ElementCollection(targetClass = Double.class)
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