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
@Table(name = "category_accessories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryAccessoriesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    /**
     * Some of types:
     * 1: băng trán
     * 2: băng cổ tay
     * 3: nón
     * 4: túi
     * 5: bình nước
     */
    private String type;
    @ElementCollection(targetClass = String.class)
    private List<String> color;
    private String brand;
    private String origin;
    @ElementCollection(targetClass = String.class)
    private List<String> size;
    private String material;
    private int productId;
}
