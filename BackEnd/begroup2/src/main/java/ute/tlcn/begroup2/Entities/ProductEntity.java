package ute.tlcn.begroup2.Entities;

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
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int storeId;
    /**
     * 3 types of category:
     * 1: category clothes
     * 2: category shoes;
     * 3: category accessories 
     */
    private int category; 
    private String name;
    private int quantity;
    private double price;
    private String description;
    private String image;
}
